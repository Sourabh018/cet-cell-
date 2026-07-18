package com.examprep.result;

import com.examprep.exam.*;
import com.examprep.question.Question;
import com.examprep.result.dto.AnalyticsDTO;
import com.examprep.result.dto.QuestionReviewDTO;
import com.examprep.result.dto.ResultDTO;
import com.examprep.result.dto.TopicScoreDTO;
import com.examprep.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResultService {
    private final ResultRepository resultRepository;
    private final ExamAttemptRepository examAttemptRepository;

    @Transactional
    public ResultDTO calculateAndSaveResult(UUID attemptId, User user) {
        Optional<Result> existingResult = resultRepository.findByAttemptId(attemptId);
        if (existingResult.isPresent()) {
            return mapToDTO(existingResult.get(), true);
        }

        ExamAttempt attempt = examAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));

        if (!attempt.getStudent().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        if (attempt.getStatus() != ExamStatus.SUBMITTED) {
            throw new RuntimeException("Exam must be SUBMITTED to calculate result");
        }

        Exam exam = attempt.getExam();

        int totalQuestions = exam.getTotalQuestions();
        int attempted = 0;
        int correct = 0;
        int wrong = 0;
        int skipped = 0;

        // 1 mark per correct answer, no negative marking
        double maxScore = totalQuestions;

        Map<UUID, TopicScoreData> topicDataMap = new HashMap<>();
        Map<String, String> answers = attempt.getAnswers();

        for (ExamQuestion eq : exam.getExamQuestions()) {
            Question q = eq.getQuestion();

            UUID topicId = q.getTopic().getId();
            topicDataMap.putIfAbsent(topicId, new TopicScoreData(topicId, q.getTopic().getName()));
            TopicScoreData topicData = topicDataMap.get(topicId);
            topicData.total++;

            String selectedShuffledOption = answers.get(q.getId().toString());
            if (selectedShuffledOption == null || selectedShuffledOption.trim().isEmpty()) {
                skipped++;
                topicData.skipped++;
            } else {
                attempted++;
                String originalSelectedKey = eq.getShuffledOptions().get(selectedShuffledOption);

                if (q.getCorrectAnswer().equals(originalSelectedKey)) {
                    correct++;
                    topicData.correct++;
                } else {
                    wrong++;
                    topicData.wrong++;
                }
            }
        }

        // finalScore = correct answers (1 mark each), no penalty
        double finalScore = correct;
        double negativeMarks = 0;
        double rawScore = correct;
        double percentage = maxScore > 0 ? (finalScore / maxScore) * 100 : 0;

        int timeTakenSeconds = (int) Duration.between(attempt.getStartedAt(), attempt.getSubmittedAt()).getSeconds();

        Result result = Result.builder()
                .attempt(attempt)
                .student(user)
                .exam(exam)
                .totalQuestions(totalQuestions)
                .attempted(attempted)
                .correct(correct)
                .wrong(wrong)
                .skipped(skipped)
                .rawScore(rawScore)
                .negativeMarks(negativeMarks)
                .finalScore(finalScore)
                .maxScore(maxScore)
                .percentage(percentage)
                .timeTakenSeconds(timeTakenSeconds)
                .build();

        List<TopicScore> topicScores = new ArrayList<>();
        for (TopicScoreData td : topicDataMap.values()) {
            // topic accuracy = correct / total questions in topic (not just attempted)
            double accuracy = td.total == 0 ? 0 : ((double) td.correct / td.total) * 100;
            TopicScore ts = TopicScore.builder()
                    .result(result)
                    .topic(Topic.builder().id(td.topicId).build())
                    .topicName(td.topicName)
                    .totalQuestions(td.total)
                    .correct(td.correct)
                    .wrong(td.wrong)
                    .skipped(td.skipped)
                    .accuracyPercentage(accuracy)
                    .build();
            topicScores.add(ts);
        }
        result.setTopicScores(topicScores);

        result = resultRepository.save(result);
        return mapToDTO(result, true);
    }

    @Transactional(readOnly = true)
    public ResultDTO getResult(UUID attemptId, User user) {
        Result result = resultRepository.findByAttemptId(attemptId)
                .orElseThrow(() -> new RuntimeException("Result not found"));

        if (!result.getStudent().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return mapToDTO(result, true);
    }

    @Transactional(readOnly = true)
    public AnalyticsDTO getAnalytics(User user) {
        // Batched fetch #1: all results + their Exam, in one query (was: 1 query + N lazy-loads for r.getExam())
        List<Result> results = resultRepository.findByStudentIdWithExam(user.getId());

        if (!results.isEmpty()) {
            // Batched fetch #2: TopicScores for all those results, in one more query
            // (was: N lazy-loads, one per result, for r.getTopicScores())
            List<UUID> resultIds = results.stream().map(Result::getId).collect(Collectors.toList());
            resultRepository.findByIdInWithTopicScores(resultIds);
            // Hibernate merges topicScores onto the already-managed `results` entities
            // within this same transaction — no need to reassign the list.
        }

        int totalExamsAttempted = results.size();
        double bestScorePercentage = results.stream().mapToDouble(Result::getPercentage).max().orElse(0.0);
        double averageScorePercentage = results.stream().mapToDouble(Result::getPercentage).average().orElse(0.0);

        List<AnalyticsDTO.ExamHistoryDTO> history = results.stream().map(r -> AnalyticsDTO.ExamHistoryDTO.builder()
                .examId(r.getExam().getId())
                .resultId(r.getId())
                .examTitle(r.getExam().getTitle())
                .percentage(r.getPercentage())
                .date(r.getCreatedAt().toString())
                .build()).collect(Collectors.toList());

        Map<UUID, TopicAggregation> topicAggMap = new HashMap<>();
        for (Result r : results) {
            for (TopicScore ts : r.getTopicScores()) {
                topicAggMap.putIfAbsent(ts.getTopic().getId(), new TopicAggregation(ts.getTopic().getId(), ts.getTopicName()));
                TopicAggregation ta = topicAggMap.get(ts.getTopic().getId());
                ta.total += ts.getTotalQuestions();
                ta.correct += ts.getCorrect();
                ta.wrong += ts.getWrong();
                ta.skipped += ts.getSkipped();
            }
        }

        List<TopicScoreDTO> weakTopics = topicAggMap.values().stream()
                .map(ta -> {
                    double accuracy = ta.total == 0 ? 0 : ((double) ta.correct / ta.total) * 100;
                    return TopicScoreDTO.builder()
                            .topicId(ta.topicId)
                            .topicName(ta.topicName)
                            .totalQuestions(ta.total)
                            .correct(ta.correct)
                            .wrong(ta.wrong)
                            .skipped(ta.skipped)
                            .accuracyPercentage(accuracy)
                            .build();
                })
                .filter(dto -> dto.getAccuracyPercentage() < 60.0)
                .sorted(Comparator.comparingDouble(TopicScoreDTO::getAccuracyPercentage))
                .collect(Collectors.toList());

        return AnalyticsDTO.builder()
                .totalExamsAttempted(totalExamsAttempted)
                .averageScorePercentage(averageScorePercentage)
                .bestScorePercentage(bestScorePercentage)
                .history(history)
                .weakTopics(weakTopics)
                .build();
    }

    private ResultDTO mapToDTO(Result result, boolean includeReview) {
        List<TopicScoreDTO> tsDTOs = result.getTopicScores().stream().map(ts -> TopicScoreDTO.builder()
                .topicId(ts.getTopic().getId())
                .topicName(ts.getTopicName())
                .totalQuestions(ts.getTotalQuestions())
                .correct(ts.getCorrect())
                .wrong(ts.getWrong())
                .skipped(ts.getSkipped())
                .accuracyPercentage(ts.getAccuracyPercentage())
                .build()).collect(Collectors.toList());

        List<QuestionReviewDTO> review = new ArrayList<>();
        if (includeReview && result.getAttempt().getStatus() == ExamStatus.SUBMITTED) {
            Map<String, String> answers = result.getAttempt().getAnswers();
            for (ExamQuestion eq : result.getExam().getExamQuestions()) {
                Question q = eq.getQuestion();
                String selectedShuffledOption = answers.get(q.getId().toString());
                String originalSelectedKey = selectedShuffledOption != null ? eq.getShuffledOptions().get(selectedShuffledOption) : null;
                boolean isCorrect = originalSelectedKey != null && originalSelectedKey.equals(q.getCorrectAnswer());

                String correctShuffledOption = null;
                for (Map.Entry<String, String> entry : eq.getShuffledOptions().entrySet()) {
                    if (entry.getValue().equals(q.getCorrectAnswer())) {
                        correctShuffledOption = entry.getKey();
                        break;
                    }
                }

                review.add(QuestionReviewDTO.builder()
                        .questionId(q.getId())
                        .questionText(q.getQuestionText())
                        .optionA(getOriginalOption(q, eq.getShuffledOptions().get("A")))
                        .optionB(getOriginalOption(q, eq.getShuffledOptions().get("B")))
                        .optionC(getOriginalOption(q, eq.getShuffledOptions().get("C")))
                        .optionD(getOriginalOption(q, eq.getShuffledOptions().get("D")))
                        .correctAnswer(correctShuffledOption)
                        .solution(q.getSolution())
                        .selectedAnswer(selectedShuffledOption)
                        .isCorrect(isCorrect)
                        .isSkipped(selectedShuffledOption == null || selectedShuffledOption.trim().isEmpty())
                        .questionOrder(eq.getQuestionOrder())
                        .topicName(q.getTopic().getName())
                        .build());
            }
        }

        review.sort(Comparator.comparingInt(QuestionReviewDTO::getQuestionOrder));

        return ResultDTO.builder()
                .id(result.getId())
                .examId(result.getExam().getId())
                .totalQuestions(result.getTotalQuestions())
                .attempted(result.getAttempted())
                .correct(result.getCorrect())
                .wrong(result.getWrong())
                .skipped(result.getSkipped())
                .rawScore(result.getRawScore())
                .negativeMarks(result.getNegativeMarks())
                .finalScore(result.getFinalScore())
                .maxScore(result.getMaxScore())
                .percentage(result.getPercentage())
                .timeTakenSeconds(result.getTimeTakenSeconds())
                .createdAt(result.getCreatedAt().toString())
                .topicScores(tsDTOs)
                .review(review)
                .build();
    }

    private String getOriginalOption(Question q, String originalKey) {
        if ("A".equals(originalKey)) return q.getOptionA();
        if ("B".equals(originalKey)) return q.getOptionB();
        if ("C".equals(originalKey)) return q.getOptionC();
        if ("D".equals(originalKey)) return q.getOptionD();
        return "";
    }

    private static class TopicScoreData {
        UUID topicId;
        String topicName;
        int total = 0;
        int correct = 0;
        int wrong = 0;
        int skipped = 0;

        TopicScoreData(UUID topicId, String topicName) {
            this.topicId = topicId;
            this.topicName = topicName;
        }

        int attempted() { return correct + wrong; }
    }

    private static class TopicAggregation {
        UUID topicId;
        String topicName;
        int total = 0;
        int correct = 0;
        int wrong = 0;
        int skipped = 0;

        TopicAggregation(UUID topicId, String topicName) {
            this.topicId = topicId;
            this.topicName = topicName;
        }
    }
}