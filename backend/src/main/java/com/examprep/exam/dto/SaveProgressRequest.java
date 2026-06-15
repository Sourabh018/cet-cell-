package com.examprep.exam.dto;

import lombok.Data;
import java.util.Map;
import java.util.List;

@Data
public class SaveProgressRequest {
    private Map<String, String> answers;
    private List<String> markedForReview;
}
