-- V3: Result Schema

ALTER TABLE questions ADD COLUMN marks INT NOT NULL DEFAULT 4;

CREATE TABLE results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    attempt_id UUID NOT NULL UNIQUE REFERENCES exam_attempts(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(id),
    exam_id UUID NOT NULL REFERENCES exams(id),
    total_questions INT NOT NULL,
    attempted INT NOT NULL,
    correct INT NOT NULL,
    wrong INT NOT NULL,
    skipped INT NOT NULL,
    raw_score DECIMAL(10,2) NOT NULL,
    negative_marks DECIMAL(10,2) NOT NULL,
    final_score DECIMAL(10,2) NOT NULL,
    max_score DECIMAL(10,2) NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    time_taken_seconds INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE topic_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    result_id UUID NOT NULL REFERENCES results(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES topics(id),
    topic_name VARCHAR(255) NOT NULL,
    total_questions INT NOT NULL,
    correct INT NOT NULL,
    wrong INT NOT NULL,
    skipped INT NOT NULL,
    accuracy_percentage DECIMAL(5,2) NOT NULL
);
