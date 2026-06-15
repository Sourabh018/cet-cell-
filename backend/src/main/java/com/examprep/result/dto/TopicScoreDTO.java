package com.examprep.result.dto;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class TopicScoreDTO {
    private UUID topicId;
    private String topicName;
    private int totalQuestions;
    private int correct;
    private int wrong;
    private int skipped;
    private double accuracyPercentage;
}
