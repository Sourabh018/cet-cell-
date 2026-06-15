-- V10__math_split_and_cet_filter.sql

-- ==============================================================================
-- Task 1: Split Class 12 Math into 2 subjects (Mathematics Part 1 & Part 2)
-- ==============================================================================

-- Insert 2 new subjects
INSERT INTO subjects (id, name, code) VALUES (gen_random_uuid(), 'Mathematics Part 1', 'MATH_P1');
INSERT INTO subjects (id, name, code) VALUES (gen_random_uuid(), 'Mathematics Part 2', 'MATH_P2');

-- Move existing Class 12 Math topics to Mathematics Part 1 (keep chapter_number 1-7)
UPDATE topics 
SET subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics Part 1')
WHERE class_level = 12 
  AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics')
  AND name IN (
    'Mathematical Logic', 
    'Matrices', 
    'Trigonometric Functions', 
    'Pair of Straight Lines', 
    'Vectors', 
    'Line and Plane', 
    'Linear Programming'
  );

-- Move existing Class 12 Math topics to Mathematics Part 2 and reset chapter_number 1-8
UPDATE topics SET subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics Part 2'), chapter_number = 1 WHERE class_level = 12 AND name = 'Differentiation' AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics Part 2'), chapter_number = 2 WHERE class_level = 12 AND name = 'Applications of Derivatives' AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics Part 2'), chapter_number = 3 WHERE class_level = 12 AND name = 'Indefinite Integration' AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics Part 2'), chapter_number = 4 WHERE class_level = 12 AND name = 'Definite Integration' AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics Part 2'), chapter_number = 5 WHERE class_level = 12 AND name IN ('Application of Definite Integration', 'Applications of Definite Integral') AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics Part 2'), chapter_number = 6 WHERE class_level = 12 AND name = 'Differential Equations' AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics Part 2'), chapter_number = 7 WHERE class_level = 12 AND name IN ('Probability Distributions', 'Probability Distribution') AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics Part 2'), chapter_number = 8 WHERE class_level = 12 AND name = 'Binomial Distribution' AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');


-- ==============================================================================
-- Task 2: Class 11 Math: keep only CET topics and re-number
-- ==============================================================================

-- Step 1: topic_scores referencing pruned topics directly
DELETE FROM topic_scores
WHERE topic_id IN (
  SELECT id FROM topics WHERE class_level = 11
  AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics')
  AND name NOT IN ('Trigonometry II','Straight Line','Circle','Probability',
    'Complex Numbers','Permutations and Combinations',
    'Functions','Limits','Continuity','Conic Sections')
);

-- Step 2: topic_scores via results → exam_attempts → exams → topics
DELETE FROM topic_scores WHERE result_id IN (
  SELECT r.id FROM results r
  JOIN exam_attempts ea ON r.attempt_id = ea.id
  JOIN exams e ON ea.exam_id = e.id
  WHERE e.topic_id IN (
    SELECT id FROM topics WHERE class_level = 11
    AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics')
    AND name NOT IN ('Trigonometry II','Straight Line','Circle','Probability',
      'Complex Numbers','Permutations and Combinations',
      'Functions','Limits','Continuity','Conic Sections')
));

-- Step 3: results
DELETE FROM results WHERE attempt_id IN (
  SELECT ea.id FROM exam_attempts ea
  JOIN exams e ON ea.exam_id = e.id
  WHERE e.topic_id IN (
    SELECT id FROM topics WHERE class_level = 11
    AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics')
    AND name NOT IN ('Trigonometry II','Straight Line','Circle','Probability',
      'Complex Numbers','Permutations and Combinations',
      'Functions','Limits','Continuity','Conic Sections')
));

-- Step 4: exam_attempts
DELETE FROM exam_attempts WHERE exam_id IN (
  SELECT id FROM exams WHERE topic_id IN (
    SELECT id FROM topics WHERE class_level = 11
    AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics')
    AND name NOT IN ('Trigonometry II','Straight Line','Circle','Probability',
      'Complex Numbers','Permutations and Combinations',
      'Functions','Limits','Continuity','Conic Sections')
));

-- Step 5: exam_questions
DELETE FROM exam_questions WHERE exam_id IN (
  SELECT id FROM exams WHERE topic_id IN (
    SELECT id FROM topics WHERE class_level = 11
    AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics')
    AND name NOT IN ('Trigonometry II','Straight Line','Circle','Probability',
      'Complex Numbers','Permutations and Combinations',
      'Functions','Limits','Continuity','Conic Sections')
));

-- Step 6: exams
DELETE FROM exams WHERE topic_id IN (
  SELECT id FROM topics WHERE class_level = 11
  AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics')
  AND name NOT IN ('Trigonometry II','Straight Line','Circle','Probability',
    'Complex Numbers','Permutations and Combinations',
    'Functions','Limits','Continuity','Conic Sections')
);

-- Step 7: exam_questions via questions
DELETE FROM exam_questions WHERE question_id IN (
  SELECT q.id FROM questions q
  JOIN topics t ON q.topic_id = t.id
  WHERE t.class_level = 11
  AND t.subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics')
  AND t.name NOT IN ('Trigonometry II','Straight Line','Circle','Probability',
    'Complex Numbers','Permutations and Combinations',
    'Functions','Limits','Continuity','Conic Sections')
);

-- Step 8: questions
DELETE FROM questions WHERE topic_id IN (
  SELECT id FROM topics WHERE class_level = 11
  AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics')
  AND name NOT IN ('Trigonometry II','Straight Line','Circle','Probability',
    'Complex Numbers','Permutations and Combinations',
    'Functions','Limits','Continuity','Conic Sections')
);

-- Step 9: topics (safe now)
DELETE FROM topics WHERE class_level = 11
AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics')
AND name NOT IN ('Trigonometry II','Straight Line','Circle','Probability',
  'Complex Numbers','Permutations and Combinations',
  'Functions','Limits','Continuity','Conic Sections');


-- Fix chapter_number for remaining Class 11 topics to match 1-10 ordered
UPDATE topics SET chapter_number = 1 WHERE name = 'Trigonometry II' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 2 WHERE name = 'Straight Line' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 3 WHERE name = 'Circle' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 4 WHERE name = 'Probability' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 5 WHERE name = 'Complex Numbers' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 6 WHERE name = 'Permutations and Combinations' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 7 WHERE name = 'Functions' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 8 WHERE name = 'Limits' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 9 WHERE name = 'Continuity' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 10 WHERE name = 'Conic Sections' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');


-- ==============================================================================
-- Task 3: Rename original Mathematics subject
-- ==============================================================================

-- Rename the original subject to make UI unambiguous
UPDATE subjects SET name = 'Mathematics (Class 11)' WHERE name = 'Mathematics';
