-- V7__chapter_ordering.sql

ALTER TABLE topics ADD COLUMN IF NOT EXISTS chapter_number INTEGER NOT NULL DEFAULT 0;

-- Class 11 Physics
UPDATE topics SET chapter_number = 1 WHERE name = 'Units and Measurements' AND class_level = 11;
UPDATE topics SET chapter_number = 3 WHERE name = 'Motion in a Plane' AND class_level = 11;
UPDATE topics SET chapter_number = 4, name = 'Laws of Motion' WHERE name = 'Laws of Motion and Gravitation' AND class_level = 11;
UPDATE topics SET chapter_number = 5 WHERE name = 'Gravitation' AND class_level = 11;
UPDATE topics SET chapter_number = 7 WHERE name = 'Thermal Properties of Matter' AND class_level = 11;
UPDATE topics SET chapter_number = 8 WHERE name = 'Sound' AND class_level = 11;
UPDATE topics SET chapter_number = 9 WHERE name = 'Optics' AND class_level = 11;
UPDATE topics SET chapter_number = 10 WHERE name = 'Electrostatics' AND class_level = 11;

-- Class 11 Chemistry
UPDATE topics SET chapter_number = 1, name = 'Some Basic Concepts of Chemistry' WHERE name = 'Basic Concepts of Chemistry' AND class_level = 11;
UPDATE topics SET chapter_number = 4 WHERE name = 'Structure of Atom' AND class_level = 11;
UPDATE topics SET chapter_number = 12 WHERE name = 'Chemical Equilibrium' AND class_level = 11;
UPDATE topics SET chapter_number = 15 WHERE name = 'Hydrocarbons' AND class_level = 11;

-- Class 11 Mathematics
UPDATE topics SET chapter_number = 2, name = 'Trigonometry - I' WHERE name = 'Trigonometry' AND class_level = 11;
UPDATE topics SET chapter_number = 16 WHERE name = 'Limits' AND class_level = 11;

-- Class 12 Physics
UPDATE topics SET chapter_number = 1 WHERE name = 'Rotational Dynamics' AND class_level = 12;
UPDATE topics SET chapter_number = 3 WHERE name = 'Kinetic Theory of Gases and Radiation' AND class_level = 12;
UPDATE topics SET chapter_number = 5 WHERE name = 'Oscillations' AND class_level = 12;
UPDATE topics SET chapter_number = 9 WHERE name = 'Current Electricity' AND class_level = 12;
UPDATE topics SET chapter_number = 12, name = 'Electromagnetic Induction' WHERE name = 'EM Induction' AND class_level = 12;

-- Class 12 Mathematics
UPDATE topics SET chapter_number = 2 WHERE name = 'Matrices' AND class_level = 12;
UPDATE topics SET chapter_number = 9 WHERE name = 'Applications of Derivatives' AND class_level = 12;
UPDATE topics SET chapter_number = 10, name = 'Indefinite Integration' WHERE name = 'Integration' AND class_level = 12;
