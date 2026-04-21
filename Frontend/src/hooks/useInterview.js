import { useDispatch, useSelector } from "react-redux";
import {
  startInterview,
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

  // ===== 1. Start =====
  const start = async () => {
    const result = await dispatch(startInterview());
    return startInterview.fulfilled.match(result);
  };

  // ===== 2. Finish =====
  const finish = async (answers) => {
    if (!interviewId) return false;

    // ✅ بنبعت questionID الصح من الـ questions array
    const formattedAnswers = answers.map((answer, index) => ({
      questionId: questions[index]?.questionID,
      type: answer.type,
      data: answer.data,
    }));

    const result = await dispatch(finishInterview({
      interviewId,
      answers: formattedAnswers,
    }));

    return finishInterview.fulfilled.match(result);
  };

  // ===== 3. History =====
  const fetchHistory = () => dispatch(getMyInterviews());

  // ===== 4. Details =====
  const fetchDetails = (id) => dispatch(getInterviewDetails(id));

  // ===== 5. Reset =====
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
    fetchHistory,
    fetchDetails,
    reset,
    clearErr,
  };
}
