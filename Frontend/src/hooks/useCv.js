import { useDispatch, useSelector } from "react-redux";
import { uploadCv, fetchCvAnalysis, clearCvState } from "../store/slices/cvSlice";

export const useCv = () => {
  const dispatch = useDispatch();
  const cvState = useSelector((state) => state.cv);

  return {
    ...cvState,
    uploadCv: (file) => dispatch(uploadCv(file)),
    fetchCvAnalysis: () => dispatch(fetchCvAnalysis()),
    clearCvState: () => dispatch(clearCvState()),
  };
};