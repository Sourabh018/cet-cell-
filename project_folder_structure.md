# Project Folder Structure

The project is divided into two main parts: the `backend` (a Spring Boot application) and the `frontend` (a React application using Vite). 

Here is the complete folder and file structure:

```text
|-- backend
|   |-- .vscode
|   |   \-- settings.json
|   |-- src
|   |   \-- main
|   |       |-- java
|   |       |   \-- com
|   |       |       \-- examprep
|   |       |           |-- auth
|   |       |           |   |-- dto
|   |       |           |   |   |-- AuthResponse.java
|   |       |           |   |   |-- LoginRequest.java
|   |       |           |   |   |-- LogoutRequest.java
|   |       |           |   |   |-- RefreshRequest.java
|   |       |           |   |   \-- RegisterRequest.java
|   |       |           |   |-- AuthController.java
|   |       |           |   |-- AuthPackageInfo.java
|   |       |           |   |-- AuthService.java
|   |       |           |   |-- JwtAuthFilter.java
|   |       |           |   |-- JwtService.java
|   |       |           |   |-- RefreshToken.java
|   |       |           |   \-- RefreshTokenRepository.java
|   |       |           |-- common
|   |       |           |   |-- CommonPackageInfo.java
|   |       |           |   \-- GlobalExceptionHandler.java
|   |       |           |-- config
|   |       |           |   |-- ApplicationConfig.java
|   |       |           |   |-- CorsConfig.java
|   |       |           |   \-- SecurityConfig.java
|   |       |           |-- exam
|   |       |           |   |-- dto
|   |       |           |   |   |-- CreateExamRequest.java
|   |       |           |   |   |-- ExamDTO.java
|   |       |           |   |   \-- SaveProgressRequest.java
|   |       |           |   |-- Difficulty.java
|   |       |           |   |-- Exam.java
|   |       |           |   |-- ExamAttempt.java
|   |       |           |   |-- ExamAttemptRepository.java
|   |       |           |   |-- ExamController.java
|   |       |           |   |-- ExamPackageInfo.java
|   |       |           |   |-- ExamQuestion.java
|   |       |           |   |-- ExamRepository.java
|   |       |           |   |-- ExamService.java
|   |       |           |   |-- ExamStatus.java
|   |       |           |   |-- Subject.java
|   |       |           |   |-- SubjectController.java
|   |       |           |   |-- SubjectRepository.java
|   |       |           |   |-- Topic.java
|   |       |           |   |-- TopicController.java
|   |       |           |   \-- TopicRepository.java
|   |       |           |-- question
|   |       |           |   |-- Question.java
|   |       |           |   |-- QuestionPackageInfo.java
|   |       |           |   \-- QuestionRepository.java
|   |       |           |-- result
|   |       |           |   |-- dto
|   |       |           |   |   |-- AnalyticsDTO.java
|   |       |           |   |   |-- QuestionReviewDTO.java
|   |       |           |   |   |-- ResultDTO.java
|   |       |           |   |   \-- TopicScoreDTO.java
|   |       |           |   |-- Result.java
|   |       |           |   |-- ResultController.java
|   |       |           |   |-- ResultPackageInfo.java
|   |       |           |   |-- ResultRepository.java
|   |       |           |   |-- ResultService.java
|   |       |           |   |-- TopicScore.java
|   |       |           |   \-- TopicScoreRepository.java
|   |       |           |-- user
|   |       |           |   |-- Role.java
|   |       |           |   |-- User.java
|   |       |           |   |-- UserPackageInfo.java
|   |       |           |   \-- UserRepository.java
|   |       |           \-- ExamPrepApplication.java
|   |       \-- resources
|   |           |-- db
|   |           |   \-- migration
|   |           |       |-- V10__math_split_and_cet_filter.sql
|   |           |       |-- V11__subject_class_level.sql
|   |           |       |-- V12__seed_kinetic_theory_questions.sql
|   |           |       |-- V13__normalize_difficulty_enum.sql
|   |           |       |-- V1__init_schema.sql
|   |           |       |-- V2__exam_schema.sql
|   |           |       |-- V3__result_schema.sql
|   |           |       |-- V4__cet_seed_data.sql
|   |           |       |-- V5__phy11_questions.sql
|   |           |       |-- V6__topic_cleanup.sql
|   |           |       |-- V7__chapter_ordering.sql
|   |           |       |-- V8__add_missing_topics.sql
|   |           |       \-- V9__fix_topic_order_and_missing.sql
|   |           |-- application.yml
|   |           \-- application.yml.local
|   |-- boot_error.txt
|   |-- boot_error2.txt
|   |-- boot_error3.txt
|   |-- boot_error4.txt
|   |-- boot_error5.txt
|   |-- boot_error6.txt
|   |-- find_bad_rows.py
|   |-- fix_comma.py
|   |-- fix_newlines.py
|   |-- fix_semicolons.py
|   |-- fix_uuids.py
|   |-- fix_v5_ids.py
|   |-- fix_v5_uuids.py
|   |-- fix_v5_uuids_2.py
|   |-- fix_v5_uuids_all.py
|   |-- generate_v7.py
|   |-- generate_v7_docker.py
|   |-- pom.xml
|   |-- process.py
|   |-- rebuild_clean.py
|   |-- rebuild_migrations.py
|   |-- run_output.log
|   |-- scratch.sql
|   |-- sql_validator.py
|-- frontend
|   |-- public
|   |   |-- favicon.svg
|   |   \-- icons.svg
|   |-- src
|   |   |-- api
|   |   |   |-- axios.ts
|   |   |   \-- result.ts
|   |   |-- assets
|   |   |   |-- hero.png
|   |   |   |-- react.svg
|   |   |   \-- vite.svg
|   |   |-- components
|   |   |   |-- index.ts
|   |   |   \-- ProtectedRoute.tsx
|   |   |-- pages
|   |   |   |-- AnalyticsPage.tsx
|   |   |   |-- DashboardPage.tsx
|   |   |   |-- ExamInstructionsPage.tsx
|   |   |   |-- ExamPage.tsx
|   |   |   |-- ExamSetupPage.tsx
|   |   |   |-- index.ts
|   |   |   |-- LoginPage.tsx
|   |   |   |-- RegisterPage.tsx
|   |   |   \-- ResultPage.tsx
|   |   |-- services
|   |   |   \-- ExamService.ts
|   |   |-- store
|   |   |   |-- authStore.ts
|   |   |   |-- examStore.ts
|   |   |   \-- index.ts
|   |   |-- types
|   |   |   \-- index.ts
|   |   |-- utils
|   |   |   \-- index.ts
|   |   |-- App.tsx
|   |   |-- index.css
|   |   \-- main.tsx
|   |-- .gitignore
|   |-- eslint.config.js
|   |-- index.html
|   |-- package-lock.json
|   |-- package.json
|   |-- postcss.config.js
|   |-- README.md
|   |-- tailwind.config.js
|   |-- tsconfig.app.json
|   |-- tsconfig.json
|   |-- tsconfig.node.json
|   |-- vite.config.ts
|-- .gitignore
|-- backup.sql
|-- docker
|-- docker-compose.yml
|-- project_structure.txt
\-- tree.ps1
```
