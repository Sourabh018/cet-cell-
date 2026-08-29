CREATE INDEX idx_exam_questions_exam_id ON exam_questions(exam_id);
CREATE INDEX idx_exam_questions_question_id ON exam_questions(question_id);
CREATE INDEX idx_exam_attempts_student_id ON exam_attempts(student_id);
CREATE INDEX idx_results_student_id ON results(student_id);

-- The one actually behind the GET /api/exams/my Seq Scan investigation:
-- ExamRepository.findByStudentIdWithDetails filters exams on student_id
-- directly (WHERE e.student.id = :studentId), and no prior migration ever
-- indexed this column — the other four indexes above cover exam_attempts,
-- results, and exam_questions, but not exams itself.
CREATE INDEX idx_exams_student_id ON exams(student_id);