package com.examprep.exam;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExamRepository extends JpaRepository<Exam, UUID> {
    List<Exam> findByStudentIdOrderByCreatedAtDesc(UUID studentId);

    @Query("SELECT DISTINCT e FROM Exam e " +
           "JOIN FETCH e.subject " +
           "LEFT JOIN FETCH e.topic " +
           "LEFT JOIN FETCH e.examQuestions eq " +
           "LEFT JOIN FETCH eq.question " +
           "WHERE e.student.id = :studentId " +
           "ORDER BY e.createdAt DESC")
    List<Exam> findByStudentIdWithDetails(@Param("studentId") UUID studentId);
}