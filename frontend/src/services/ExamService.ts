import api from '../api/axios';

export const ExamService = {
  createExam: async (subjectId: string, topicId: string) => {
    const res = await api.post("/exams/create", {
      subjectId,
      topicId
    });
    return res.data;
  }
};
