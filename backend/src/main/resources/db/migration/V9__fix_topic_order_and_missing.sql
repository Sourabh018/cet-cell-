-- V9__fix_topic_order_and_missing.sql

-- PART 1: Fix chapter_number on existing topics (UPDATE)

-- Class 12 Physics
UPDATE topics SET chapter_number = 1 WHERE name = 'Rotational Dynamics' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
UPDATE topics SET chapter_number = 3 WHERE name = 'Kinetic Theory of Gases and Radiation' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
UPDATE topics SET chapter_number = 5 WHERE name = 'Oscillations' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
UPDATE topics SET chapter_number = 8 WHERE name = 'Electrostatics' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
UPDATE topics SET chapter_number = 9 WHERE name = 'Current Electricity' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
UPDATE topics SET chapter_number = 12 WHERE name = 'Electromagnetic Induction' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');

-- Class 12 Chemistry
UPDATE topics SET chapter_number = 1 WHERE name = 'Solid State' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
UPDATE topics SET chapter_number = 2 WHERE name = 'Solutions and Colligative Properties' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
UPDATE topics SET chapter_number = 4 WHERE name = 'Chemical Thermodynamics' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
UPDATE topics SET chapter_number = 5 WHERE name = 'Electrochemistry' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
UPDATE topics SET chapter_number = 6 WHERE name = 'Chemical Kinetics' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
UPDATE topics SET chapter_number = 9 WHERE name = 'Coordination Compounds' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
UPDATE topics SET chapter_number = 10 WHERE name = 'Halogen Derivatives of Alkanes' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
UPDATE topics SET chapter_number = 11 WHERE name = 'Alcohols Phenols and Ethers' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
UPDATE topics SET chapter_number = 12 WHERE name = 'Aldehydes Ketones and Carboxylic Acids' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
UPDATE topics SET chapter_number = 13 WHERE name = 'Organic Compounds Containing Nitrogen' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
UPDATE topics SET chapter_number = 14 WHERE name = 'Biomolecules' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
UPDATE topics SET chapter_number = 15 WHERE name = 'Polymers' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');

-- Class 12 Mathematics
UPDATE topics SET chapter_number = 1 WHERE name = 'Mathematical Logic' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 2 WHERE name = 'Matrices' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 3 WHERE name = 'Trigonometric Functions' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 4 WHERE name = 'Pair of Straight Lines' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 5 WHERE name = 'Vectors' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 6 WHERE name = 'Line and Plane' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 7 WHERE name = 'Linear Programming' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 8 WHERE name = 'Differentiation' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 9 WHERE name = 'Applications of Derivatives' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 10 WHERE name = 'Indefinite Integration' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 12 WHERE name = 'Applications of Definite Integral' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 13 WHERE name = 'Differential Equations' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 14 WHERE name = 'Probability Distribution' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 15 WHERE name = 'Binomial Distribution' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');

-- Class 11 Mathematics
UPDATE topics SET chapter_number = 2 WHERE name = 'Trigonometry - I' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 3 WHERE name = 'Trigonometry II' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 5 WHERE name = 'Straight Line' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 6 WHERE name = 'Circle' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 8 WHERE name = 'Measures of Dispersion' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 9 WHERE name = 'Probability' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 15 WHERE name = 'Functions' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 16 WHERE name = 'Limits' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');
UPDATE topics SET chapter_number = 17 WHERE name = 'Continuity' AND class_level = 11 AND subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics');

-- PART 2: Insert missing topics

-- Class 11 Mathematics (missing)
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Angle and its Measurement', 11, 1, (SELECT id FROM subjects WHERE name = 'Mathematics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Determinants and Matrices', 11, 4, (SELECT id FROM subjects WHERE name = 'Mathematics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Conic Sections', 11, 7, (SELECT id FROM subjects WHERE name = 'Mathematics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Complex Numbers', 11, 10, (SELECT id FROM subjects WHERE name = 'Mathematics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Permutations and Combinations', 11, 11, (SELECT id FROM subjects WHERE name = 'Mathematics'));

-- Class 12 Physics (missing)
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Mechanical Properties of Fluids', 12, 2, (SELECT id FROM subjects WHERE name = 'Physics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Thermodynamics', 12, 4, (SELECT id FROM subjects WHERE name = 'Physics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Superposition of Waves', 12, 6, (SELECT id FROM subjects WHERE name = 'Physics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Wave Optics', 12, 7, (SELECT id FROM subjects WHERE name = 'Physics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Magnetic Fields due to Electric Current', 12, 10, (SELECT id FROM subjects WHERE name = 'Physics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Magnetic Materials', 12, 11, (SELECT id FROM subjects WHERE name = 'Physics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'AC Circuits', 12, 13, (SELECT id FROM subjects WHERE name = 'Physics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Dual Nature of Radiation and Matter', 12, 14, (SELECT id FROM subjects WHERE name = 'Physics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Structure of Atoms and Nuclei', 12, 15, (SELECT id FROM subjects WHERE name = 'Physics'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Semiconductor Devices', 12, 16, (SELECT id FROM subjects WHERE name = 'Physics'));

-- Class 12 Chemistry (missing)
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Ionic Equilibria', 12, 3, (SELECT id FROM subjects WHERE name = 'Chemistry'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Elements of Groups 16, 17 and 18', 12, 7, (SELECT id FROM subjects WHERE name = 'Chemistry'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Transition and Inner Transition Elements', 12, 8, (SELECT id FROM subjects WHERE name = 'Chemistry'));
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Green Chemistry and Nanochemistry', 12, 16, (SELECT id FROM subjects WHERE name = 'Chemistry'));

-- Class 12 Mathematics (missing)
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES (gen_random_uuid(), 'Definite Integration', 12, 11, (SELECT id FROM subjects WHERE name = 'Mathematics'));

-- PART 3: Delete wrong topics inserted by V8 that don't match book

DELETE FROM topics WHERE name = 'Wave Motion' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
DELETE FROM topics WHERE name = 'Stationary Waves' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
DELETE FROM topics WHERE name = 'Wave Theory of Light' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
DELETE FROM topics WHERE name = 'Interference and Diffraction' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
DELETE FROM topics WHERE name = 'Magnetic Effects of Electric Current' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
DELETE FROM topics WHERE name = 'Magnetism' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
DELETE FROM topics WHERE name = 'Electrons and Photons' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
DELETE FROM topics WHERE name = 'Atoms Molecules and Nuclei' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
DELETE FROM topics WHERE name = 'Semiconductors' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');
DELETE FROM topics WHERE name = 'Communication Systems' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Physics');

DELETE FROM topics WHERE name = 'p-Block Elements' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
DELETE FROM topics WHERE name = 'd and f Block Elements' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
DELETE FROM topics WHERE name = 'Chemistry in Everyday Life' AND class_level = 12 AND subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry');
