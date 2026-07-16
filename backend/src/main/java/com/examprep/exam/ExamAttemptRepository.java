package com.examprep.exam;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExamAttemptRepository extends JpaRepository<ExamAttempt, UUID> {
    ExamAttempt findByExamId(UUID examId);
    List<ExamAttempt> findByExamIdIn(List<UUID> examIds);
}