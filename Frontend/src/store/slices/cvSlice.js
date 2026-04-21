import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadCvApi, getCvAnalysisApi } from "../../api/cvApi";

// ===== Upload CV =====
export const uploadCv = createAsyncThunk(
  "cv/uploadCv",
  async (cvFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("cv", cvFile);
      const response = await uploadCvApi(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);

// ===== Fetch Analysis =====
export const getCvAnalysis = createAsyncThunk(
  "cv/getAnalysis",
  async (_, { rejectWithValue }) => {
    try {
      return await getCvAnalysisApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch CV analysis");
    }
  }
);

const cvSlice = createSlice({
  name: "cv",
  initialState: {
    data: null,
    uploadResult: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearCvState: (state) => {
      state.data = null;
      state.uploadResult = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {

    // Upload
    builder
      .addCase(uploadCv.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadCv.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.uploadResult = action.payload;
      })
      .addCase(uploadCv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // Fetch Analysis
    builder
      .addCase(getCvAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCvAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCvAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCvState } = cvSlice.actions;
export default cvSlice.reducer;
