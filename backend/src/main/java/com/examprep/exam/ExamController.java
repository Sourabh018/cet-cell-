package com.examprep.exam;

import com.examprep.exam.dto.CreateExamRequest;
import com.examprep.exam.dto.ExamDTO;
import com.examprep.exam.dto.SaveProgressRequest;
import com.examprep.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    @PostMapping("/create")
    public ResponseEntity<?> createExam(
            @Valid @RequestBody CreateExamRequest request,
            @AuthenticationPrincipal User user) {
        try {
            return ResponseEntity.ok(examService.createExam(request, user));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{examId}")
    public ResponseEntity<ExamDTO> getExam(
            @PathVariable UUID examId,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(examService.getExam(examId, user));
    }
    
    @GetMapping("/my")
    public ResponseEntity<List<ExamDTO>> getMyExams(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(examService.getMyExams(user));
    }

    @PostMapping("/{examId}/start")
    public ResponseEntity<Map<String, String>> startExam(
            @PathVariable UUID examId,
            @AuthenticationPrincipal User user) {
        examService.startExam(examId, user);
        return ResponseEntity.ok(Map.of("message", "Exam started successfully"));
    }

    @PostMapping("/{examId}/save")
    public ResponseEntity<Map<String, String>> saveProgress(
            @PathVariable UUID examId,
            @RequestBody SaveProgressRequest request,
            @AuthenticationPrincipal User user) {
        examService.saveProgress(examId, request, user);
        return ResponseEntity.ok(Map.of("message", "Progress saved successfully"));
    }

    @PostMapping("/{examId}/submit")
    public ResponseEntity<Map<String, String>> submitExam(
            @PathVariable UUID examId,
            @AuthenticationPrincipal User user) {
        examService.submitExam(examId, user);
        return ResponseEntity.ok(Map.of("message", "Exam submitted successfully"));
    }
}
