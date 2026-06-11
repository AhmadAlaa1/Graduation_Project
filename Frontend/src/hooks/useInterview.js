import { useDispatch, useSelector } from "react-redux";
import {
  startInterview,
  startInterviewWithJob,
  finishInterview,
  getMyInterviews,
  getInterviewDetails,
  resetInterview,
  clearError,
} from "../store/slices/interviewSlice";

export function useInterview() {
  const dispatch = useDispatch();

  const {
    interviewId,
    questions,
    evaluations,
    history,
    details,
    loading,
    error,
    isFinished,
  } = useSelector((state) => state.interview);

  // ===== 1. Start (CV) =====
  const start = async () => {
    const result = await dispatch(startInterview());
    return startInterview.fulfilled.match(result);
  };

  // ===== 2. Start (Job) =====
  const startWithJob = async ({ role, level }) => {
    const result = await dispatch(startInterviewWithJob({ role, level }));
    return startInterviewWithJob.fulfilled.match(result);
  };

  // ===== 3. Finish =====
  const finish = async (answers) => {
    if (!interviewId) return false;

    const formattedAnswers = answers.map((answer, index) => ({
      questionId: answer.questionId || questions[index]?.questionID,
      type: answer.type,
      data: answer.data,
    }));

    const result = await dispatch(finishInterview({ interviewId, answers: formattedAnswers }));
    return finishInterview.fulfilled.match(result);
  };

  // ===== 4. History =====
  const fetchHistory = () => dispatch(getMyInterviews());

  // ===== 5. Details =====
  const fetchDetails = (id) => dispatch(getInterviewDetails(id));

  // ===== 6. Reset =====
  const reset = () => dispatch(resetInterview());
  const clearErr = () => dispatch(clearError());

  return {
    interviewId,
    questions,
    evaluations,
    history,
    details,
    loading,
    error,
    isFinished,
    start,
    finish,
    startWithJob,
    fetchHistory,
    fetchDetails,
    reset,
    clearErr,
  };
}