import { useDispatch, useSelector } from "react-redux";
import { uploadCv, getCvAnalysis, clearCvState } from "../store/slices/cvSlice";

export const useCv = () => {
  const dispatch = useDispatch();
  const cvState = useSelector((state) => state.cv);

  return {
    ...cvState,
    uploadCv: (file) => dispatch(uploadCv(file)),
    getCvAnalysis: () => dispatch(getCvAnalysis()),
    clearCvState: () => dispatch(clearCvState()),
  };
};