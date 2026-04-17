import axiosInstance from "./axiosInstance";

export const uploadCvApi = (formData) => {
  return axiosInstance.put("/cv/upload-cv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCvAnalysisApi = () => {
  return axiosInstance.get("/cv/my-cv-analysis");
};