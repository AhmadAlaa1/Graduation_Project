import axiosInstance from "./axiosInstance";

// ===== 1. Start Interview (CV-based) =====
export const startInterviewApi = async () => {
  const response = await axiosInstance.get("/inter/start");
  return response.data;
};

export const startInterviewWithJobApi = async ({ role, level }) => {
  const response = await axiosInstance.post(
    "/inter/startWithJob",
    { role, level }
  );

  return response.data;
};

// ===== 3. Finish & Evaluate Interview =====
export const finishInterviewApi = async (interviewId, answers) => {
  const formData = new FormData();

  answers.forEach((answer, index) => {
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

  return response.data.evaluations;
};

// ===== 4. My Interviews History =====
export const getMyInterviewsApi = async () => {
  const response = await axiosInstance.get("/user/my-interviews");
  return response.data;
};

// ===== 5. Interview Details =====
export const getInterviewDetailsApi = async (interviewId) => {
  const response = await axiosInstance.get(`/user/${interviewId}/interview-details`);
  return response.data;
};