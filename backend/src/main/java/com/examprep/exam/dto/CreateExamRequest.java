package com.examprep.exam.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.UUID;

@Data
public class CreateExamRequest {
    @NotNull
    private UUID subjectId;
    private UUID topicId; // Optional if mixing topics
}
