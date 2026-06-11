import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  startInterviewApi,
  startInterviewWithJobApi,
  finishInterviewApi,
  getMyInterviewsApi,
  getInterviewDetailsApi,
} from "../../api/interviewApi";

export const startInterview = createAsyncThunk(
  "interview/start",
  async (_, { rejectWithValue }) => {
    try {
      return await startInterviewApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to start interview");
    }
  }
);

export const startInterviewWithJob = createAsyncThunk(
  "interview/startWithJob",
  async ({ role, level }, { rejectWithValue }) => {
    try {
      return await startInterviewWithJobApi({ role, level });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to start interview");
    }
  }
);

export const finishInterview = createAsyncThunk(
  "interview/finish",
  async ({ interviewId, answers }, { rejectWithValue }) => {
    try {
      return await finishInterviewApi(interviewId, answers);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit interview");
    }
  }
);

export const getMyInterviews = createAsyncThunk(
  "interview/getMyInterviews",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyInterviewsApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch interviews");
    }
  }
);

export const getInterviewDetails = createAsyncThunk(
  "interview/getDetails",
  async (interviewId, { rejectWithValue }) => {
    try {
      return await getInterviewDetailsApi(interviewId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch details");
    }
  }
);

// helper مشترك لمعالجة الـ start response
const handleStartFulfilled = (state, action) => {
  state.loading = false;
  state.interviewId = action.payload.interviewId;
  const mapped = action.payload.mappedQuestions || [];
  state.questions = [...mapped].sort((a, b) => a.orderNumber - b.orderNumber);
};

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    interviewId: null,
    questions: [],
    evaluations: [],
    history: [],
    details: null,
    loading: false,
    error: null,
    isFinished: false,
  },
  reducers: {
    resetInterview: (state) => {
      state.interviewId = null;
      state.questions = [];
      state.evaluations = [];
      state.isFinished = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {

    // ===== Start (CV) =====
    builder
      .addCase(startInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startInterview.fulfilled, handleStartFulfilled)
      .addCase(startInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ===== Start (Job) =====
    builder
      .addCase(startInterviewWithJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startInterviewWithJob.fulfilled, handleStartFulfilled)
      .addCase(startInterviewWithJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ===== Finish =====
    builder
      .addCase(finishInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finishInterview.fulfilled, (state, action) => {
        state.loading = false;
        state.evaluations = action.payload;
        state.isFinished = true;
      })
      .addCase(finishInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ===== History =====
    builder
      .addCase(getMyInterviews.pending, (state) => { state.loading = true; })
      .addCase(getMyInterviews.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(getMyInterviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ===== Details =====
    builder
      .addCase(getInterviewDetails.pending, (state) => { state.loading = true; })
      .addCase(getInterviewDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(getInterviewDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetInterview, clearError } = interviewSlice.actions;
export default interviewSlice.reducer;