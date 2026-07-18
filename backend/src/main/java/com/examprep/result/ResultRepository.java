package com.examprep.result;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ResultRepository extends JpaRepository<Result, UUID> {
    Optional<Result> findByAttemptId(UUID attemptId);

    List<Result> findByStudentIdOrderByCreatedAtDesc(UUID studentId);

    // Batched fetch #1: pulls all of a student's results with their Exam eagerly joined,
    // in one query instead of one lazy-load per result.
    @Query("SELECT r FROM Result r JOIN FETCH r.exam WHERE r.student.id = :studentId ORDER BY r.createdAt DESC")
    List<Result> findByStudentIdWithExam(@Param("studentId") UUID studentId);

    // Batched fetch #2: pulls TopicScores for a given set of result IDs in one query
    // instead of one lazy-load per result. Called with the IDs from findByStudentIdWithExam.
    @Query("SELECT DISTINCT r FROM Result r LEFT JOIN FETCH r.topicScores WHERE r.id IN :resultIds")
    List<Result> findByIdInWithTopicScores(@Param("resultIds") List<UUID> resultIds);
}