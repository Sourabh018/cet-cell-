package com.examprep.result.dto;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;
import java.util.Map;

@Data
@Builder
public class QuestionReviewDTO {
    private UUID questionId;
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;
    private String solution;
    private String selectedAnswer;
    private boolean isCorrect;
    private boolean isSkipped;
    private int questionOrder;
    private String topicName;
}
