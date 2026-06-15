-- ============================================================
-- Chapter: Kinetic Theory of Gases and Radiation
-- Class: 12 | Board: HSC Maharashtra | Target: MHT-CET / JEE level
-- Total: 50 questions | All calculation-based, zero theory fluff
-- Covers PYQ patterns from MHT-CET 2020–2025
-- ============================================================
-- Assumes table: questions(id, topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source)
-- Set topic_id to your actual DB value for this chapter
-- ============================================================

-- ────────────────────────────────────────────
-- SECTION A: KINETIC THEORY OF GASES (Q1–Q28)
-- ────────────────────────────────────────────

-- Q1 [RMS Speed + Temperature]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'The rms speed of molecules of a gas at -68°C is v. To what temperature (in °C) must the gas be heated so that the rms speed becomes 2v?',
'327°C', '927°C', '1127°C', '727°C',
'C',
'ABOVE_CET',
'MHT-CET PYQ pattern 2023');

-- Q2 [Pressure when mass halved, speed doubled]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A gas is enclosed in a vessel at pressure P. If masses of all molecules are halved and their speeds are doubled, the new pressure is:',
'P', '2P', '4P', 'P/2',
'B',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q3 [KE and Temperature]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'The mean kinetic energy of molecules of an ideal gas at 399°C is E. The temperature at which the mean KE will be E/2 is:',
'200 K', '273 K', '336 K', '146 K',
'C',
'CET',
'MHT-CET PYQ 2023');

-- Q4 [Degrees of freedom → gamma]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'For a gas, R/Cv = 0.4. The gas is:',
'Monoatomic', 'Diatomic', 'Triatomic (linear)', 'Polyatomic (non-linear)',
'B',
'CET',
'MHT-CET PYQ 2023');

-- Q5 [Two jars — find number of molecules ratio]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'Jar A has gas at pressure P, volume V, temperature T. Jar B has gas at pressure 2P, volume V/4, temperature 2T. The ratio of number of molecules in jar A to jar B is:',
'1:1', '2:1', '4:1', '1:2',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q6 [Adiabatic compression — rms velocity]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'An ideal gas (γ = 1.5) expands adiabatically. To reduce the rms velocity of molecules to 1/3 of original, the gas must be expanded by a factor of:',
'9', '27', '81', '3',
'C',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q7 [Adiabatic compression — final pressure]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A diatomic gas (γ = 7/5) is compressed adiabatically to volume Vi/32. If the initial temperature is Ti, the final temperature is:',
'4Ti', '8Ti', '2Ti', '16Ti',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q8 [Sudden compression at NTP]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A gas at NTP is suddenly compressed to 1/4 of its original volume. Given γ = 1.5, the final pressure is:',
'4 atm', '8 atm', '16 atm', '2√2 atm',
'B',
'CET',
'MHT-CET PYQ 2023');

-- Q9 [Kinetic energy in container — given P, V]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'An ideal gas in a container of volume 500 cc is at pressure 2×10⁵ N/m². The average kinetic energy of each molecule is 6×10⁻²¹ J. The number of molecules in the container is:',
'2.5×10²²', '5×10²²', '1.67×10²²', '3.33×10²²',
'C',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q10 [Monoatomic gas — adiabatic then isothermal]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A monoatomic gas at pressure P, volume V expands isothermally to volume 2V, then adiabatically to volume 4V. The final pressure is (γ = 5/3):',
'P/2^(8/3)', 'P/2^(5/3)', 'P/4', 'P/2^(11/3)',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q11 [Average force on wall depends on T^x]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'The average force applied on walls of a closed container depends on T^x where T is temperature of an ideal gas. The value of x is:',
'1/2', '1', '3/2', '2',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q12 [Temperature ratio O2 vs H2 — same mass, V, P]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A sample of oxygen gas and a sample of hydrogen gas both have the same mass, same volume and same pressure. The ratio of their absolute temperatures (T_O2 : T_H2) is:',
'16:1', '1:16', '4:1', '1:4',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q13 [Insulated container — gas moving, then stops]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'An insulated container contains a monoatomic gas of molar mass m. The container is moving with velocity V. If it is suddenly stopped, the change in temperature of the gas is (R = gas constant):',
'mV²/3R', 'mV²/2R', 'mV²/R', '3mV²/2R',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q14 [rms speed ratio after temperature change]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'If the temperature of gas molecules is raised from 127°C to 527°C, the ratio of rms speeds (initial : final) is:',
'1:√2', '1:2', '√2:1', '2:1',
'A',
'CET',
'MHT-CET PYQ 2023');

-- Q15 [Molecular mass from rms ratio]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'The molecular mass of gas A having rms speed 4 times that of gas B (molecular mass 32) is:',
'0.5', '2', '0.125', '8',
'A',
'CET',
'MHT-CET PYQ 2023');

-- Q16 [Adiabatic work done]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A sample of gas at temperature T is adiabatically expanded to double its volume. The work done by the gas in this process is (γ = 5/3, n = 1 mol):',
'RT(2^(2/3) - 1) × 3/2', 'RT/2', 'RT(1 - 2^(-2/3)) × 3/2', 'RT ln2',
'C',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q17 [PV = nRT applied to density]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'For an ideal gas, density is ρ₀ at temperature T₀ and pressure P₀. When pressure is 2P₀ and temperature is 2T₀, the density is:',
'ρ₀', '2ρ₀', 'ρ₀/2', '4ρ₀',
'A',
'CET',
'MHT-CET PYQ 2023');

-- Q18 [Cp/Cv for gas with R/Cv = 0.4]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A gas has R/Cv = 0.4. If Cp and Cv represent molar specific heats, the ratio Cp/Cv (γ) for this gas is:',
'1.4', '1.67', '1.3', '1.5',
'A',
'CET',
'MHT-CET PYQ 2023');

-- Q19 [Monoatomic gas — compression — temperature]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A monoatomic gas (γ = 5/3) at 27°C and volume V is suddenly compressed to V/8. The final temperature is:',
'300 K', '600 K', '1200 K', '2400 K',
'C',
'ABOVE_CET',
'MHT-CET PYQ 2022');

-- Q20 [Two monatomic ideal gases — KE ratio]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'Two monoatomic ideal gases A (molecular mass m₁) and B (molecular mass m₂) are enclosed at same temperature. The ratio of rms speed of A to rms speed of B is:',
'√(m₁/m₂)', '√(m₂/m₁)', 'm₂/m₁', 'm₁/m₂',
'B',
'CET',
'MHT-CET PYQ 2022');

-- Q21 [Isochoric heat supply]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'dQ is heat supplied to an ideal gas under isochoric (constant volume) conditions. Which of the following correctly represents the situation?',
'dQ = dU; dW = 0', 'dQ = dW; dU = 0', 'dQ = 0; dU = -dW', 'dQ = dU + dW where dW ≠ 0',
'A',
'CET',
'MHT-CET PYQ 2023');

-- Q22 [Gas compressed — change in pressure]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'At constant temperature, if pressure of a gas is increased by 5%, its volume decreases by approximately:',
'5%', '4.76%', '5.25%', '10%',
'B',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q23 [Internal energy monoatomic]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'The internal energy of a monoatomic ideal gas of n moles at temperature T is:',
'nRT', '(3/2)nRT', '(5/2)nRT', '3nRT',
'B',
'CET',
'MHT-CET PYQ 2023');

-- Q24 [Cp/Cv for polyatomic — f degrees of freedom]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'For a polyatomic gas with f degrees of freedom, the ratio Cp/Cv is:',
'(f+2)/f', '(f+1)/f', 'f/(f-2)', '(f+2)/(f-1)',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q25 [rms unchanged on isothermal compression]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'If a gas is compressed isothermally, the rms velocity of the molecules:',
'Increases', 'Decreases', 'Remains unchanged', 'Becomes zero',
'C',
'CET',
'MHT-CET PYQ 2023');

-- Q26 [Change in internal energy — isobaric]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'The change in internal energy when a gas expands from volume V to 2V at constant pressure P is (monoatomic, n = 1 mol):',
'PV', '(3/2)PV', '(5/2)PV', '2PV',
'B',
'ABOVE_CET',
'MHT-CET PYQ 2021');

-- Q27 [Refrigerator COP]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'An ideal refrigerator has a freezer at -13°C. Its coefficient of performance is 5. The temperature of the room (sink) where heat is rejected is:',
'320 K', '325 K', '340 K', '260 K',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q28 [Carnot — same efficiency two ranges]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A Carnot engine has the same efficiency between (i) 100 K and 600 K and (ii) T K and 960 K. The value of T is:',
'160 K', '240 K', '360 K', '200 K',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- ─────────────────────────────────────────────────────
-- SECTION B: RADIATION — KIRCHHOFF, STEFAN, WIEN (Q29–50)
-- ─────────────────────────────────────────────────────

-- Q29 [Stefan's law — temperature increased 50%]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'If the temperature of a hot body is increased by 50%, the increase in quantity of radiated heat (as a percentage) is approximately:',
'106%', '200%', '400%', '406%',
'D',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q30 [Black body radiation — wavelength shift]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A black body radiates maximum energy at wavelength λ and emissive power E. When temperature changes such that the peak wavelength becomes 3λ/4, the new emissive power is:',
'(3/4)⁴ E', '(4/3)⁴ E', '(4/3)² E', '(3/4)² E',
'B',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q31 [Sphere at 627°C vs 327°C — rate ratio]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'Compare the rate of loss of heat from a metal sphere at 627°C with the rate at 327°C (surrounding temperature = 27°C):',
'(9/4)⁴ - correction', '(900⁴-300⁴)/(600⁴-300⁴)', '81:16', 'Approx 4.07:1',
'D',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q32 [Black body — emissive power at 127°C]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A black body at 127°C radiates heat at 5 cal/cm²·s. At a temperature of 527°C, the rate of radiation (in cal/cm²·s) will be:',
'20', '40', '80', '160',
'C',
'CET',
'MHT-CET PYQ 2023');

-- Q33 [Stefan — sphere radius changed, temperature changed]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A black sphere of radius R has rate of radiation E at temperature T. If radius becomes R/3 and temperature becomes 3T, the new rate of radiation is:',
'E', '3E', '9E', 'E/3',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q34 [Emissive power sphere — heat emitted]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A sphere of area 0.04 m² has emissive power 0.7 kcal·s⁻¹·m⁻². The heat emitted by the sphere in 20 seconds is:',
'0.56 kcal', '11.2 kcal', '0.028 kcal', '1.12 kcal',
'A',
'CET',
'MHT-CET PYQ 2021');

-- Q35 [Absorption, reflection, transmission]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A thin plate has coefficient of absorption a = 0.77 and coefficient of reflection r = 0.17. If 250 kcal of heat is incident on it, the heat transmitted through the plate is:',
'15 kcal', '25 kcal', '42.5 kcal', '192.5 kcal',
'A',
'CET',
'MHT-CET PYQ 2023');

-- Q36 [Three discs — radiation — which cools fastest]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'Three discs X, Y and Z of radii 2 m, 3 m and 6 m respectively are coated with carbon black on one face. Each is heated to same temperature and left in identical surroundings. Ratio of initial rates of cooling of X:Y:Z is:',
'36:9:1', '1:4:9', '4:9:36', '9:4:1',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2022');

-- Q37 [Sphere vs cube — same volume, same temperature — cooling]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A sphere and a cube of copper have equal volumes. Both are blackened and allowed to cool at same temperature in same surroundings. The ratio of their initial rates of cooling (sphere : cube) is:',
'(π/6)^(1/3) : 1', 'greater than 1', 'less than 1', '1:1',
'C',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q38 [Sphere, cube, circular plate — which cools fastest]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A sphere, a cube and a thin circular plate, all of same material and same mass, are heated to 200°C. Which one of them cools at fastest rate?',
'Sphere', 'Cube', 'Thin circular plate', 'All cool at same rate',
'C',
'CET',
'MHT-CET PYQ 2023');

-- Q39 [Wien's displacement — temperature from wavelength]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A black body emits maximum radiation at wavelength λ = 2.0 μm at temperature T₁. Another black body emits maximum at λ = 0.5 μm at temperature T₂. The ratio T₁:T₂ is:',
'4:1', '1:4', '2:1', '1:2',
'B',
'CET',
'MHT-CET PYQ pattern');

-- Q40 [Newton's law of cooling — cooling rate difference]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A metal rod cools at 4°C/min when its temperature is 90°C and at 1°C/min when its temperature is 45°C. The temperature of surrounding is:',
'20°C', '25°C', '30°C', '15°C',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q41 [Newton cooling — hot water cooling time]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'Hot water cools from 80°C to 60°C in 1 minute. The time needed to cool from 60°C to 40°C (surrounding at 20°C) using Newton''s law of cooling is approximately:',
'1 min', '1.5 min', '2 min', '2.5 min',
'B',
'ABOVE_CET',
'MHT-CET PYQ pattern 2023');

-- Q42 [Thermal conductivity — composite slab]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A composite slab has two materials with thermal conductivity K and 2K, thickness x and 4x respectively. The effective thermal conductivity of the slab is:',
'5K/3', '3K/5', '2K/3', 'K',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q43 [Heat flow — temperature gradient]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A metal rod 2 m long increases by 1.6 mm when heated from 0°C to 60°C. The temperature gradient in a rod of length 75 cm is 40°C/m. If temperature of the cooler end is 20°C, the temperature of the hotter end is:',
'50°C', '60°C', '55°C', '45°C',
'A',
'CET',
'MHT-CET PYQ 2023');

-- Q44 [Rate of heat flow — copper rod]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'Rate of heat flow through a copper rod with temperature difference 28°C is 1400 cal/s. The thermal resistance of the rod is (in °C·s/cal):',
'0.01', '0.02', '0.05', '0.1',
'B',
'CET',
'MHT-CET PYQ 2021');

-- Q45 [Rate of heat flow ratio — two rods — brass rods A and B]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'Two uniform brass rods A (length 2l, radius 2r) and B (length l, radius r) are heated to same temperature. The ratio of increase in volume of A to B is:',
'2:1', '4:1', '8:1', '16:1',
'C',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q46 [Coefficient of linear expansion from volume change]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'The volume of a metal sphere increases by 0.33% when temperature is raised by 50°C. The coefficient of linear expansion of the metal is:',
'22×10⁻⁶/°C', '2.2×10⁻⁶/°C', '11×10⁻⁶/°C', '33×10⁻⁶/°C',
'B',
'CET',
'MHT-CET PYQ 2023');

-- Q47 [Two rods — difference in length constant at all temperatures]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'The difference in length between two rods A and B is 60 cm at all temperatures. If αA = 18×10⁻⁶/°C and αB = 12×10⁻⁶/°C, the lengths of A and B (in cm) are:',
'L_A = 120, L_B = 60', 'L_A = 60, L_B = 120', 'L_A = 180, L_B = 120', 'L_A = 90, L_B = 30',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q48 [Carnot efficiency — source temperature change]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A Carnot engine with 50% efficiency takes heat from a source at 600 K. To increase efficiency to 70%, keeping the sink temperature constant, the source temperature must be raised to:',
'1000 K', '900 K', '840 K', '720 K',
'A',
'ABOVE_CET',
'MHT-CET PYQ 2023');

-- Q49 [Carnot engine — work and heat rejected]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A Carnot engine operates with source at 227°C and sink at 27°C. Source supplies 50 kJ of heat per cycle. The work done per cycle and heat rejected to sink are respectively:',
'33.3 kJ, 16.7 kJ', '25 kJ, 25 kJ', '16.7 kJ, 33.3 kJ', '10 kJ, 40 kJ',
'C',
'CET',
'MHT-CET PYQ 2023');

-- Q50 [Piece of metal dropped in water — equilibrium temperature]
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, source) VALUES
(3,
'A piece of metal at 850 K is dropped into 1 kg of water at 300 K. Specific heat of metal is 0.4 cal/(g·°C) and mass is 400 g. The equilibrium temperature (specific heat of water = 1 cal/(g·°C)) is approximately:',
'320 K', '340 K', '360 K', '380 K',
'C',
'ABOVE_CET',
'MHT-CET PYQ 2023');
