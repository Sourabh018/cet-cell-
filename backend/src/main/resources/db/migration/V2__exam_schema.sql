-- V2: Exam Schema and Seed Data

CREATE TABLE subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE
);

CREATE TABLE questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject_id UUID NOT NULL REFERENCES subjects(id),
    topic_id UUID NOT NULL REFERENCES topics(id),
    difficulty VARCHAR(50) NOT NULL,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer VARCHAR(1) NOT NULL,
    solution TEXT,
    time_estimate INT NOT NULL DEFAULT 60,
    has_image BOOLEAN NOT NULL DEFAULT FALSE,
    image_url VARCHAR(1024),
    verified BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INT NOT NULL DEFAULT 1
);

CREATE TABLE exams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    student_id UUID NOT NULL REFERENCES users(id),
    subject_id UUID NOT NULL REFERENCES subjects(id),
    topic_id UUID REFERENCES topics(id),
    difficulty VARCHAR(50) NOT NULL,
    total_questions INT NOT NULL,
    duration_minutes INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    started_at TIMESTAMP,
    submitted_at TIMESTAMP
);

CREATE TABLE exam_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id),
    question_order INT NOT NULL,
    shuffled_options JSONB
);

CREATE TABLE exam_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_id UUID NOT NULL UNIQUE REFERENCES exams(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(id),
    answers JSONB,
    marked_for_review JSONB,
    started_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_saved_at TIMESTAMP,
    submitted_at TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE'
);

-- Seed Data (3 subjects, 5 topics each, 20 sample questions)
INSERT INTO subjects (id, name, code) VALUES
('a1111111-1111-1111-1111-111111111111', 'Physics', 'PHYSICS'),
('b2222222-2222-2222-2222-222222222222', 'Chemistry', 'CHEMISTRY'),
('c3333333-3333-3333-3333-333333333333', 'Mathematics', 'MATHS');

INSERT INTO topics (id, name, subject_id) VALUES
('d1111111-1111-1111-1111-111111111111', 'Kinematics', 'a1111111-1111-1111-1111-111111111111'),
('d1111112-1111-1111-1111-111111111111', 'Thermodynamics', 'a1111111-1111-1111-1111-111111111111'),
('d1111113-1111-1111-1111-111111111111', 'Electromagnetism', 'a1111111-1111-1111-1111-111111111111'),
('d1111114-1111-1111-1111-111111111111', 'Optics', 'a1111111-1111-1111-1111-111111111111'),
('d1111115-1111-1111-1111-111111111111', 'Modern Physics', 'a1111111-1111-1111-1111-111111111111'),

('d2222221-2222-2222-2222-222222222222', 'Organic Chemistry', 'b2222222-2222-2222-2222-222222222222'),
('d2222222-2222-2222-2222-222222222222', 'Inorganic Chemistry', 'b2222222-2222-2222-2222-222222222222'),
('d2222223-2222-2222-2222-222222222222', 'Physical Chemistry', 'b2222222-2222-2222-2222-222222222222'),
('d2222224-2222-2222-2222-222222222222', 'Biochemistry', 'b2222222-2222-2222-2222-222222222222'),
('d2222225-2222-2222-2222-222222222222', 'Analytical Chemistry', 'b2222222-2222-2222-2222-222222222222'),

('d3333331-3333-3333-3333-333333333333', 'Calculus', 'c3333333-3333-3333-3333-333333333333'),
('d3333332-3333-3333-3333-333333333333', 'Algebra', 'c3333333-3333-3333-3333-333333333333'),
('d3333333-3333-3333-3333-333333333333', 'Geometry', 'c3333333-3333-3333-3333-333333333333'),
('d3333334-3333-3333-3333-333333333333', 'Trigonometry', 'c3333333-3333-3333-3333-333333333333'),
('d3333335-3333-3333-3333-333333333333', 'Statistics', 'c3333333-3333-3333-3333-333333333333');

-- Insert 20 Sample Questions (Physics - Kinematics)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, option_a, option_b, option_c, option_d, correct_answer, solution) VALUES
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'EASY', 'What is the SI unit of velocity?', 'm/s', 'm/s^2', 'km/h', 'm', 'A', 'Velocity is displacement per unit time.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'EASY', 'A car travels 60 km in 2 hours. What is its average speed?', '20 km/h', '30 km/h', '40 km/h', '60 km/h', 'B', 'Speed = Distance / Time = 60 / 2 = 30 km/h.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'EASY', 'Which of the following is a scalar quantity?', 'Velocity', 'Acceleration', 'Force', 'Speed', 'D', 'Speed has only magnitude, no direction.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'EASY', 'Acceleration is defined as the rate of change of:', 'Distance', 'Displacement', 'Velocity', 'Speed', 'C', 'a = dv/dt'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'EASY', 'If a body is at rest, its velocity is:', 'Positive', 'Negative', 'Zero', 'Infinite', 'C', 'At rest means it is not moving.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'MEDIUM', 'A train accelerates from rest to 20 m/s in 10 s. What is its acceleration?', '1 m/s^2', '2 m/s^2', '4 m/s^2', '20 m/s^2', 'B', 'a = (v-u)/t = (20-0)/10 = 2 m/s^2.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'MEDIUM', 'An object falls freely from rest. What is its velocity after 3 seconds? (g = 9.8 m/s^2)', '9.8 m/s', '19.6 m/s', '29.4 m/s', '44.1 m/s', 'C', 'v = u + gt = 0 + 9.8*3 = 29.4 m/s.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'MEDIUM', 'A car travels 100m East, then 50m West. What is its displacement?', '150m East', '150m West', '50m East', '50m West', 'C', 'Displacement is the shortest distance from initial to final point: 100 - 50 = 50m East.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'MEDIUM', 'The area under a velocity-time graph represents:', 'Acceleration', 'Displacement', 'Speed', 'Force', 'B', 'The integral of velocity w.r.t time is displacement.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'MEDIUM', 'A projectile is launched at an angle of 45 degrees. Its range is:', 'Minimum', 'Maximum', 'Zero', 'Depends on mass', 'B', 'Range is maximum at 45 degrees for a given initial velocity.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'MEDIUM', 'If velocity is constant, acceleration is:', 'Constant non-zero', 'Zero', 'Increasing', 'Decreasing', 'B', 'Acceleration is change in velocity. If velocity is constant, change is zero.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'MEDIUM', 'What is the equation of motion for displacement with constant acceleration?', 'v = u + at', 'v^2 = u^2 + 2as', 's = ut + (1/2)at^2', 'F = ma', 'C', 'Second equation of motion.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'HARD', 'A stone is dropped from a cliff of height h. It hits the ground with speed v. If dropped from 4h, it hits with speed:', 'v', '2v', '4v', '16v', 'B', 'v^2 = 2gh. If h becomes 4h, v^2 becomes 4 times, so v becomes 2 times.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'HARD', 'Two bodies of masses m1 and m2 are dropped from the same height. The ratio of times taken to reach the ground is:', 'm1:m2', 'm2:m1', '1:1', 'sqrt(m1):sqrt(m2)', 'C', 'Time of fall is independent of mass (ignoring air resistance).'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'HARD', 'A particle moves with position x = 2t^2 - 3t. Its velocity at t=2 is:', '1', '3', '5', '7', 'C', 'v = dx/dt = 4t - 3. At t=2, v = 4(2) - 3 = 5.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'HARD', 'A body is thrown vertically upwards with velocity u. The maximum height reached is:', 'u/g', 'u^2/g', 'u^2/2g', '2u/g', 'C', 'Using v^2 = u^2 - 2gs. At max height v=0, so 0 = u^2 - 2gs => s = u^2/2g.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'HARD', 'The slope of a displacement-time graph gives:', 'Speed', 'Velocity', 'Acceleration', 'Jerk', 'B', 'Slope = dx/dt = velocity.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'HARD', 'An object covers half distance with speed v1 and other half with v2. Average speed is:', '(v1+v2)/2', 'sqrt(v1*v2)', '2v1*v2/(v1+v2)', 'v1*v2/(v1+v2)', 'C', 'Harmonic mean of speeds for equal distances.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'MIXED', 'If a particle''s velocity is given by v = t^2, its acceleration at t=3 is:', '3', '6', '9', '12', 'B', 'a = dv/dt = 2t. At t=3, a=6.'),
('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'MIXED', 'Displacement is a:', 'Scalar', 'Vector', 'Tensor', 'None', 'B', 'It has both magnitude and direction.');
