package com.examprep.exam;

import com.examprep.exam.dto.CreateExamRequest;
import com.examprep.exam.dto.ExamDTO;
import com.examprep.exam.dto.SaveProgressRequest;
import com.examprep.question.Question;
import com.examprep.question.QuestionRepository;
import com.examprep.result.ResultRepository;
import com.examprep.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;
    private final ExamAttemptRepository examAttemptRepository;
    private final QuestionRepository questionRepository;
    private final SubjectRepository subjectRepository;
    private final TopicRepository topicRepository;
    private final ResultRepository resultRepository; // ← added

    @Transactional
    public ExamDTO createExam(CreateExamRequest request, User user) {
        System.out.println("=== CREATE EXAM === subjectId=" + request.getSubjectId() + " topicId=" + request.getTopicId() + " user=" + user);
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        Topic topic = null;
        if (request.getTopicId() != null) {
            topic = topicRepository.findById(request.getTopicId())
                    .orElseThrow(() -> new RuntimeException("Topic not found"));
        }

        List<Question> questions;
        if (topic != null) {
            questions = questionRepository.findBySubjectIdAndTopicId(subject.getId(), topic.getId());
            Collections.shuffle(questions);
        } else {
            throw new RuntimeException("Topic is required for exam generation currently.");
        }

        if (questions.isEmpty()) {
            throw new RuntimeException("No questions available in the database for the selected subject and topic.");
        }

        Exam exam = Exam.builder()
                .title(subject.getName() + " - " + topic.getName() + " Exam")
                .student(user)
                .subject(subject)
                .topic(topic)
                .difficulty(Difficulty.MIXED)
                .totalQuestions(questions.size())
                .durationMinutes(60)
                .status(ExamStatus.PENDING)
                .build();

        exam = examRepository.save(exam);

        List<ExamQuestion> examQuestions = new ArrayList<>();
        int order = 1;
        for (Question q : questions) {
            Map<String, String> shuffled = new HashMap<>();
            List<String> opts = Arrays.asList("A", "B", "C", "D");
            Collections.shuffle(opts);
            shuffled.put("A", opts.get(0));
            shuffled.put("B", opts.get(1));
            shuffled.put("C", opts.get(2));
            shuffled.put("D", opts.get(3));

            ExamQuestion eq = ExamQuestion.builder()
                    .exam(exam)
                    .question(q)
                    .questionOrder(order++)
                    .shuffledOptions(shuffled)
                    .build();
            examQuestions.add(eq);
        }

        exam.getExamQuestions().addAll(examQuestions);
        exam = examRepository.save(exam);

        ExamAttempt attempt = ExamAttempt.builder()
                .exam(exam)
                .student(user)
                .answers(new HashMap<>())
                .markedForReview(new ArrayList<>())
                .status(ExamStatus.PENDING)
                .build();
        examAttemptRepository.save(attempt);

        return mapToDTO(exam, attempt);
    }

    @Transactional(readOnly = true)
    public ExamDTO getExam(UUID examId, User user) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        if (!exam.getStudent().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        ExamAttempt attempt = examAttemptRepository.findByExamId(examId);
        return mapToDTO(exam, attempt);
    }

    @Transactional(readOnly = true)
    public List<ExamDTO> getMyExams(User user) {
        return examRepository.findByStudentIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(exam -> {
                    ExamAttempt attempt = examAttemptRepository.findByExamId(exam.getId());
                    return mapToDTO(exam, attempt);
                }).collect(Collectors.toList());
    }

    @Transactional
    public void startExam(UUID examId, User user) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        if (!exam.getStudent().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        if (exam.getStatus() != ExamStatus.PENDING) {
            throw new RuntimeException("Exam already started or completed");
        }
        exam.setStatus(ExamStatus.ACTIVE);
        exam.setStartedAt(LocalDateTime.now());
        examRepository.save(exam);

        ExamAttempt attempt = examAttemptRepository.findByExamId(examId);
        attempt.setStatus(ExamStatus.ACTIVE);
        attempt.setStartedAt(exam.getStartedAt());
        examAttemptRepository.save(attempt);
    }

    @Transactional
    public void saveProgress(UUID examId, SaveProgressRequest request, User user) {
        ExamAttempt attempt = examAttemptRepository.findByExamId(examId);
        if (attempt == null || !attempt.getStudent().getId().equals(user.getId())) {
            throw new RuntimeException("Exam attempt not found or access denied");
        }
        if (attempt.getStatus() != ExamStatus.ACTIVE) {
            throw new RuntimeException("Exam is not active");
        }

        Exam exam = attempt.getExam();
        if (exam.getDurationMinutes() > 0 && exam.getStartedAt().plusMinutes(exam.getDurationMinutes()).isBefore(LocalDateTime.now())) {
            submitExam(examId, user);
            throw new RuntimeException("Exam time has expired");
        }

        attempt.setAnswers(request.getAnswers());
        attempt.setMarkedForReview(request.getMarkedForReview());
        attempt.setLastSavedAt(LocalDateTime.now());
        examAttemptRepository.save(attempt);
    }

    @Transactional
    public void submitExam(UUID examId, User user) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        if (!exam.getStudent().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        if (exam.getStatus() == ExamStatus.SUBMITTED) {
            return;
        }

        exam.setStatus(ExamStatus.SUBMITTED);
        exam.setSubmittedAt(LocalDateTime.now());
        examRepository.save(exam);

        ExamAttempt attempt = examAttemptRepository.findByExamId(examId);
        attempt.setStatus(ExamStatus.SUBMITTED);
        attempt.setSubmittedAt(exam.getSubmittedAt());
        examAttemptRepository.save(attempt);
    }

    private ExamDTO mapToDTO(Exam exam, ExamAttempt attempt) {
        List<ExamDTO.QuestionDTO> questionDTOs = exam.getExamQuestions().stream().map(eq -> {
            Question q = eq.getQuestion();
            Map<String, String> shuffled = eq.getShuffledOptions();

            String optA = getOriginalOption(q, shuffled.get("A"));
            String optB = getOriginalOption(q, shuffled.get("B"));
            String optC = getOriginalOption(q, shuffled.get("C"));
            String optD = getOriginalOption(q, shuffled.get("D"));

            return ExamDTO.QuestionDTO.builder()
                    .id(q.getId())
                    .questionText(q.getQuestionText())
                    .optionA(optA)
                    .optionB(optB)
                    .optionC(optC)
                    .optionD(optD)
                    .hasImage(q.isHasImage())
                    .imageUrl(q.getImageUrl())
                    .questionOrder(eq.getQuestionOrder())
                    .build();
        }).sorted(Comparator.comparingInt(ExamDTO.QuestionDTO::getQuestionOrder)).collect(Collectors.toList());

        ExamDTO.AttemptDTO attemptDTO = null;
        if (attempt != null) {
            // ── Fetch score from result if submitted ──
            Double score = null;
            Double percentage = null;
            if (attempt.getStatus() == ExamStatus.SUBMITTED) {
                double[] scores = {0.0, 0.0};
                resultRepository.findByAttemptId(attempt.getId()).ifPresent(r -> {
                    scores[0] = r.getFinalScore();
                    scores[1] = r.getPercentage();
                });
                score = scores[0];
                percentage = scores[1];
            }

            attemptDTO = ExamDTO.AttemptDTO.builder()
                    .id(attempt.getId())
                    .answers(attempt.getAnswers())
                    .markedForReview(attempt.getMarkedForReview())
                    .startedAt(attempt.getStartedAt() != null ? attempt.getStartedAt().toString() : null)
                    .lastSavedAt(attempt.getLastSavedAt() != null ? attempt.getLastSavedAt().toString() : null)
                    .status(attempt.getStatus().name())
                    .score(score)
                    .percentage(percentage)
                    .build();
        }

        return ExamDTO.builder()
                .id(exam.getId())
                .title(exam.getTitle())
                .subjectName(exam.getSubject().getName())
                .topicName(exam.getTopic() != null ? exam.getTopic().getName() : null)
                .difficulty(exam.getDifficulty().name())
                .totalQuestions(exam.getTotalQuestions())
                .durationMinutes(exam.getDurationMinutes())
                .status(exam.getStatus().name())
                .questions(questionDTOs)
                .attempt(attemptDTO)
                .build();
    }

    private String getOriginalOption(Question q, String originalKey) {
        if ("A".equals(originalKey)) return q.getOptionA();
        if ("B".equals(originalKey)) return q.getOptionB();
        if ("C".equals(originalKey)) return q.getOptionC();
        if ("D".equals(originalKey)) return q.getOptionD();
        return "";
    }
}