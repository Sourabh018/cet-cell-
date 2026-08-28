package com.examprep.exam;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExamRepository extends JpaRepository<Exam, UUID> {
    List<Exam> findByStudentIdOrderByCreatedAtDesc(UUID studentId);

    // Single-exam counterpart to findByStudentIdWithDetails below — fixes the
    // N+1 VeloxDiag flagged on GET /exams/{id}: plain findById() left subject,
    // topic, and every ExamQuestion->Question pair lazy-loaded individually
    // (one query per question, ~55 for a full exam). This eager-fetches all
    // of it in one query, same shape as the list version, just scoped to one row.
    @Query("SELECT e FROM Exam e " +
           "JOIN FETCH e.subject " +
           "LEFT JOIN FETCH e.topic " +
           "LEFT JOIN FETCH e.examQuestions eq " +
           "LEFT JOIN FETCH eq.question " +
           "WHERE e.id = :examId")
    Optional<Exam> findByIdWithDetails(@Param("examId") UUID examId);

    @Query("SELECT DISTINCT e FROM Exam e " +
           "JOIN FETCH e.subject " +
           "LEFT JOIN FETCH e.topic " +
           "LEFT JOIN FETCH e.examQuestions eq " +
           "LEFT JOIN FETCH eq.question " +
           "WHERE e.student.id = :studentId " +
           "ORDER BY e.createdAt DESC")
    List<Exam> findByStudentIdWithDetails(@Param("studentId") UUID studentId);
}
