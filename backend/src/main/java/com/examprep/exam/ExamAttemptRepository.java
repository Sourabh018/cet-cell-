package com.examprep.exam;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExamAttemptRepository extends JpaRepository<ExamAttempt, UUID> {
    ExamAttempt findByExamId(UUID examId);
    List<ExamAttempt> findByExamIdIn(List<UUID> examIds);

    // Fixes the real N+1 behind VeloxDiag's /api/results/{id} finding
    // (avg 51.3 queries, max 57, recurring in 91% of requests) — this is the
    // POST calculateAndSaveResult path, hit on every single exam submission,
    // not the already-fixed GET path. The old plain findById(attemptId) left
    // attempt.getExam() (1 query), exam.getExamQuestions() (1 query), and
    // then eq.getQuestion() + q.getTopic() lazy-loaded PER QUESTION inside
    // ResultService's scoring loop — for a 50-question exam that's exactly
    // the ~1 + 1 + 50 pattern the samples showed.
    //
    // Safe to fetch-join all three levels in one query here: exam.examQuestions
    // is the only *collection* (bag) being joined — question and topic are
    // both @ManyToOne (to-one), which don't trigger Hibernate's
    // MultipleBagFetchException the way two simultaneous @OneToMany bags do
    // (see ResultRepository.findByAttemptIdWithDetails for that case).
    @Query("SELECT a FROM ExamAttempt a " +
           "JOIN FETCH a.exam e " +
           "LEFT JOIN FETCH e.examQuestions eq " +
           "LEFT JOIN FETCH eq.question q " +
           "LEFT JOIN FETCH q.topic " +
           "WHERE a.id = :attemptId")
    Optional<ExamAttempt> findByIdWithExamDetails(@Param("attemptId") UUID attemptId);
}