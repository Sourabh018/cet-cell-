import api from './axios';
import type { ResultDTO, AnalyticsDTO } from '../types';

export const resultApi = {
  calculateResult: async (attemptId: string): Promise<ResultDTO> => {
    const response = await api.post<ResultDTO>(`/results/${attemptId}`);
    return response.data;
  },
  getResult: async (attemptId: string): Promise<ResultDTO> => {
    const response = await api.get<ResultDTO>(`/results/${attemptId}`);
    return response.data;
  },
  getAnalytics: async (): Promise<AnalyticsDTO> => {
    const response = await api.get<AnalyticsDTO>('/results/analytics');
    return response.data;
  }
};
