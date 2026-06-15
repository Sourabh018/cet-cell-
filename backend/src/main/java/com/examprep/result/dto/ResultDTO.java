package com.examprep.result.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ResultDTO {
    private UUID id;
    private UUID examId;
    private int totalQuestions;
    private int attempted;
    private int correct;
    private int wrong;
    private int skipped;
    private double rawScore;
    private double negativeMarks;
    private double finalScore;
    private double maxScore;
    private double percentage;
    private int timeTakenSeconds;
    private String createdAt;
    
    private List<TopicScoreDTO> topicScores;
    private List<QuestionReviewDTO> review;
}
