import axiosInstance from "./axiosInstance";

// ===== 1. Start Interview =====
export const startInterviewApi = async () => {
  const response = await axiosInstance.get("/inter/start");
  return response.data;
  // بيرجع: { interviewId, mappedQuestions: [{ questionID, questionText, questionAudio, orderNumber }] }
};

// ===== 2. Finish & Evaluate Interview =====
export const finishInterviewApi = async (interviewId, answers) => {
  const formData = new FormData();

  answers.forEach((answer, index) => {
    // ✅ questionId بتاع كل سؤال
    formData.append(`answers[${index}].questionId`, answer.questionId);

    if (answer.type === "essay") {
      formData.append(`answers[${index}].answerText`, answer.data);
    } else if (answer.type === "voice") {
      formData.append(`answers[${index}].answerAudio`, answer.data);
    }
  });

  const response = await axiosInstance.post(
    `/inter/${interviewId}/finish`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  // ✅ بيرجع { evaluations: [...] } مش array مباشرة
  return response.data.evaluations;
};

// ===== 3. My Interviews History =====
export const getMyInterviewsApi = async () => {
  const response = await axiosInstance.get("/user/my-interviews");
  return response.data;
};

// ===== 4. Interview Details =====
export const getInterviewDetailsApi = async (interviewId) => {
  const response = await axiosInstance.get(`/user/${interviewId}/interview-details`);
  return response.data;
};
