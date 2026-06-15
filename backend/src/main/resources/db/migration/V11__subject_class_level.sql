-- V11__subject_class_level.sql

ALTER TABLE subjects ADD COLUMN class_level INTEGER DEFAULT 0;

UPDATE subjects SET class_level = 11 WHERE name = 'Mathematics (Class 11)';
UPDATE subjects SET class_level = 12 WHERE name = 'Mathematics Part 1';
UPDATE subjects SET class_level = 12 WHERE name = 'Mathematics Part 2';
UPDATE subjects SET class_level = 0 WHERE name = 'Physics';
UPDATE subjects SET class_level = 0 WHERE name = 'Chemistry';
