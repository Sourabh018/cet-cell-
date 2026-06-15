package com.examprep.exam.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
public class ExamDTO {
    private UUID id;
    private String title;
    private String subjectName;
    private String topicName;
    private String difficulty;
    private int totalQuestions;
    private int durationMinutes;
    private String status;
    private List<QuestionDTO> questions;
    private AttemptDTO attempt;

    @Data
    @Builder
    public static class QuestionDTO {
        private UUID id;
        private String questionText;
        private String optionA;
        private String optionB;
        private String optionC;
        private String optionD;
        private boolean hasImage;
        private String imageUrl;
        private int questionOrder;
    }

    @Data
    @Builder
    public static class AttemptDTO {
        private UUID id;
        private Map<String, String> answers;
        private List<String> markedForReview;
        private String startedAt;
        private String lastSavedAt;
        private String status;
        private Double score;
        private Double percentage;
    }
}