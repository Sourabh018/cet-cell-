-- V8__add_missing_topics.sql
-- Inserts missing MHT-CET chapters using gen_random_uuid() and subject_id subqueries

-- Class 11 Physics
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES
(gen_random_uuid(), 'Vectors', 11, 2, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Error Analysis', 11, 6, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Semiconductors', 11, 14, (SELECT id FROM subjects WHERE name = 'Physics'));

-- Class 11 Chemistry
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES
(gen_random_uuid(), 'Chemical Bonding', 11, 5, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Redox Reactions', 11, 6, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Elements of Group 1 and 2', 11, 8, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'States of Matter (Gaseous and Liquids)', 11, 10, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Adsorption and Colloids', 11, 11, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Basic Principles of Organic Chemistry', 11, 14, (SELECT id FROM subjects WHERE name = 'Chemistry'));

-- Class 11 Mathematics
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES
(gen_random_uuid(), 'Trigonometry II', 11, 3, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Straight Line', 11, 5, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Circle', 11, 6, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Measures of Dispersion', 11, 8, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Probability', 11, 9, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Complex Numbers', 11, 10, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Permutations and Combinations', 11, 12, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Functions', 11, 15, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Continuity', 11, 17, (SELECT id FROM subjects WHERE name = 'Mathematics'));

-- Class 12 Physics
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES
(gen_random_uuid(), 'Circular Motion', 12, 2, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Rotational Motion', 12, 4, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Gravitation', 12, 6, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Elasticity', 12, 7, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Surface Tension', 12, 8, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Wave Motion', 12, 10, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Stationary Waves', 12, 11, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Wave Theory of Light', 12, 13, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Interference and Diffraction', 12, 14, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Electrostatics', 12, 15, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Magnetic Effects of Electric Current', 12, 16, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Magnetism', 12, 17, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Electrons and Photons', 12, 18, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Atoms Molecules and Nuclei', 12, 19, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Semiconductors', 12, 20, (SELECT id FROM subjects WHERE name = 'Physics')),
(gen_random_uuid(), 'Communication Systems', 12, 21, (SELECT id FROM subjects WHERE name = 'Physics'));

-- Class 12 Chemistry
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES
(gen_random_uuid(), 'Solid State', 12, 1, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Solutions and Colligative Properties', 12, 2, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Chemical Thermodynamics', 12, 4, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Electrochemistry', 12, 5, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Chemical Kinetics', 12, 6, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'p-Block Elements', 12, 7, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'd and f Block Elements', 12, 8, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Coordination Compounds', 12, 9, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Halogen Derivatives of Alkanes', 12, 10, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Alcohols Phenols and Ethers', 12, 11, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Aldehydes Ketones and Carboxylic Acids', 12, 12, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Organic Compounds Containing Nitrogen', 12, 13, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Biomolecules', 12, 14, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Polymers', 12, 15, (SELECT id FROM subjects WHERE name = 'Chemistry')),
(gen_random_uuid(), 'Chemistry in Everyday Life', 12, 16, (SELECT id FROM subjects WHERE name = 'Chemistry'));

-- Class 12 Mathematics
INSERT INTO topics (id, name, class_level, chapter_number, subject_id) VALUES
(gen_random_uuid(), 'Mathematical Logic', 12, 1, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Trigonometric Functions', 12, 3, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Pair of Straight Lines', 12, 4, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Vectors', 12, 5, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Three Dimensional Geometry', 12, 6, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Line and Plane', 12, 7, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Linear Programming', 12, 8, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Differentiation', 12, 11, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Applications of Definite Integral', 12, 13, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Differential Equations', 12, 14, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Probability Distribution', 12, 15, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Binomial Distribution', 12, 16, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Continuity', 12, 17, (SELECT id FROM subjects WHERE name = 'Mathematics')),
(gen_random_uuid(), 'Statistics', 12, 18, (SELECT id FROM subjects WHERE name = 'Mathematics'));
