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

    // Batched fetch: used by ExamService.getMyExams() to pre-fetch every
    // SUBMITTED exam's Result in one query instead of one findByAttemptId()
    // call per exam inside the mapping loop — that per-exam call was the real
    // N+1 VeloxDiag flagged on GET /exams/my (the ExamQuestion/Question side
    // was already properly fetch-joined; this was the other, separate cause).
    List<Result> findByAttemptIdIn(List<UUID> attemptIds);

    // Single-attempt counterpart, with the same eager fetch shape as
    // ExamRepository.findByIdWithDetails — fixes the N+1 VeloxDiag flagged on
    // GET /results/{attemptId}: plain findByAttemptId() left result.getExam(),
    // its examQuestions, and each eq.getQuestion() lazy-loaded individually.
    //
    // Split into two queries rather than one: e.examQuestions and r.topicScores
    // are both @OneToMany List (bag) collections, and Hibernate refuses to
    // LEFT JOIN FETCH two bags in the same query (MultipleBagFetchException,
    // confirmed via real Postman verification against production — this had
    // been reviewed as "correct" but never actually executed until then).
    // Same split-query + shared-persistence-context pattern already used by
    // findByStudentIdWithExam + findByIdInWithTopicScores below: the second
    // query's return value is discarded by the caller (ResultService.getResult)
    // and exists purely so Hibernate's identity map attaches topicScores onto
    // the same managed Result instance the first query already returned.
    @Query("SELECT r FROM Result r " +
           "JOIN FETCH r.exam e " +
           "JOIN FETCH r.attempt " +
           "LEFT JOIN FETCH e.examQuestions eq " +
           "LEFT JOIN FETCH eq.question " +
           "WHERE r.attempt.id = :attemptId")
    Optional<Result> findByAttemptIdWithDetails(@Param("attemptId") UUID attemptId);

    // Second half of findByAttemptIdWithDetails's fetch shape — see comment
    // above. Must run in the same transaction as findByAttemptIdWithDetails
    // for the identity-map attachment to work.
    @Query("SELECT r FROM Result r LEFT JOIN FETCH r.topicScores WHERE r.attempt.id = :attemptId")
    Optional<Result> findByAttemptIdWithTopicScores(@Param("attemptId") UUID attemptId);

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