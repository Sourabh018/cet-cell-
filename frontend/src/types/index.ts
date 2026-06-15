// Shared TypeScript types and interfaces

export interface User {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "ADMIN";
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  details?: Record<string, string>;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface Topic {
  id: string;
  name: string;
  subjectId: string;
}

export interface QuestionDTO {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  hasImage: boolean;
  imageUrl: string | null;
  questionOrder: number;
}

export interface AttemptDTO {
  id: string;
  answers: Record<string, string>;
  markedForReview: string[];
  startedAt: string | null;
  lastSavedAt: string | null;
  status: string;
}

export interface ExamDTO {
  id: string;
  title: string;
  subjectName: string;
  topicName: string | null;
  difficulty: string;
  totalQuestions: number;
  durationMinutes: number;
  status: string;
  questions: QuestionDTO[];
  attempt: AttemptDTO | null;
}

export interface TopicScoreDTO {
  topicId: string;
  topicName: string;
  totalQuestions: number;
  correct: number;
  wrong: number;
  skipped: number;
  accuracyPercentage: number;
}

export interface QuestionReviewDTO {
  questionId: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  solution: string;
  selectedAnswer: string;
  isCorrect: boolean;
  isSkipped: boolean;
  questionOrder: number;
  topicName: string;
}

export interface ResultDTO {
  id: string;
  examId: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  skipped: number;
  rawScore: number;
  negativeMarks: number;
  finalScore: number;
  maxScore: number;
  percentage: number;
  timeTakenSeconds: number;
  createdAt: string;
  topicScores: TopicScoreDTO[];
  review: QuestionReviewDTO[];
}

export interface ExamHistoryDTO {
  examId: string;
  resultId: string;
  examTitle: string;
  percentage: number;
  date: string;
}

export interface AnalyticsDTO {
  totalExamsAttempted: number;
  averageScorePercentage: number;
  bestScorePercentage: number;
  history: ExamHistoryDTO[];
  weakTopics: TopicScoreDTO[];
}
