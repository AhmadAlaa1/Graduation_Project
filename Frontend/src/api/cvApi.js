import axiosInstance from "./axiosInstance";

export const uploadCvApi = (formData) => {
  return axiosInstance.put("/cv/upload-cv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCvAnalysisApi = async () => {
  const response = await axiosInstance.get("/cv/my-cv-analysis");
  return response.data;
};
