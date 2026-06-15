package com.examprep.question;

import com.examprep.exam.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {

    @Query(value = "SELECT * FROM questions WHERE subject_id = :subjectId AND topic_id = :topicId AND difficulty = :difficulty ORDER BY RANDOM() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomQuestions(UUID subjectId, UUID topicId, String difficulty, int limit);

    @Query(value = "SELECT * FROM questions WHERE subject_id = :subjectId AND topic_id = :topicId ORDER BY RANDOM() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomQuestionsMixed(UUID subjectId, UUID topicId, int limit);

    List<Question> findBySubjectIdAndTopicId(UUID subjectId, UUID topicId);
}
