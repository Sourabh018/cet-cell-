package com.examprep.result.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class AnalyticsDTO {
    private int totalExamsAttempted;
    private double averageScorePercentage;
    private double bestScorePercentage;
    private List<ExamHistoryDTO> history;
    private List<TopicScoreDTO> weakTopics;

    @Data
    @Builder
    public static class ExamHistoryDTO {
        private UUID examId;
        private UUID resultId;
        private String examTitle;
        private double percentage;
        private String date;
    }
}
