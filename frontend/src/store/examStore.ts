import { create } from 'zustand';
import api from '../api/axios';
import type { ExamDTO } from '../types';

interface ExamState {
  exam: ExamDTO | null;
  currentIndex: number;
  answers: Record<string, string>;
  markedForReview: Set<string>;
  timeRemaining: number | null; // in seconds
  isLoading: boolean;
  error: string | null;

  setExam: (exam: ExamDTO) => void;
  setAnswer: (questionId: string, option: string) => void;
  toggleMark: (questionId: string) => void;
  navigate: (index: number) => void;
  clearResponse: (questionId: string) => void;
  autoSave: () => Promise<void>;
  submitExam: () => Promise<void>;
  decrementTime: () => void;
  clearStore: () => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
  exam: null,
  currentIndex: 0,
  answers: {},
  markedForReview: new Set(),
  timeRemaining: null,
  isLoading: false,
  error: null,

  setExam: (exam) => {
    let timeRem: number | null = null;

    if (exam.durationMinutes > 0) {
      let timeRem2 = exam.durationMinutes * 60;
      if (exam.attempt?.startedAt) {
        const elapsed = Math.floor(
          (Date.now() - new Date(exam.attempt.startedAt).getTime()) / 1000
        );
        timeRem2 = Math.max(0, timeRem2 - elapsed);
      }
      timeRem = timeRem2;
    }

    set({
      exam,
      answers: exam.attempt?.answers || {},
      markedForReview: new Set(exam.attempt?.markedForReview || []),
      currentIndex: 0,
      timeRemaining: timeRem, // null = unlimited
    });
  },

  setAnswer: (questionId, option) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: option }
    }));
  },

  toggleMark: (questionId) => {
    set((state) => {
      const newMarked = new Set(state.markedForReview);
      if (newMarked.has(questionId)) {
        newMarked.delete(questionId);
      } else {
        newMarked.add(questionId);
      }
      return { markedForReview: newMarked };
    });
  },

  navigate: (index) => {
    set({ currentIndex: index });
  },

  clearResponse: (questionId) => {
    set((state) => {
      const newAnswers = { ...state.answers };
      delete newAnswers[questionId];
      return { answers: newAnswers };
    });
  },

  decrementTime: () => {
    set((state) => {
      if (state.timeRemaining !== null && state.timeRemaining > 0) {
        return { timeRemaining: state.timeRemaining - 1 };
      }
      return state;
    });
  },

  autoSave: async () => {
    const state = get();
    if (!state.exam) return;
    
    try {
      await api.post(`/exams/${state.exam.id}/save`, {
        answers: state.answers,
        markedForReview: Array.from(state.markedForReview)
      });
    } catch (error) {
      console.error("Auto-save failed", error);
    }
  },

  submitExam: async () => {
    const state = get();
    if (!state.exam) return;
    
    set({ isLoading: true });
    try {
      // Auto-save first
      await api.post(`/exams/${state.exam.id}/save`, {
        answers: state.answers,
        markedForReview: Array.from(state.markedForReview)
      });
      // Submit
      await api.post(`/exams/${state.exam.id}/submit`);
      
      set((state) => {
        if(state.exam) {
           return {
             exam: {
               ...state.exam,
               status: 'SUBMITTED'
             }
           }
        }
        return state;
      });
    } catch (error) {
      console.error("Submit failed", error);
    } finally {
      set({ isLoading: false });
    }
  },

  clearStore: () => set({ exam: null, currentIndex: 0, answers: {}, markedForReview: new Set(), timeRemaining: null })
}));
