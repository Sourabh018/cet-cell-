-- V13: Normalize legacy difficulty values to match updated Difficulty enum
-- Old values: EASY, MEDIUM, HARD  →  New values: CET, ABOVE_CET, MIXED

UPDATE questions SET difficulty = 'CET'       WHERE difficulty IN ('EASY', 'MEDIUM');
UPDATE questions SET difficulty = 'ABOVE_CET' WHERE difficulty = 'HARD';
