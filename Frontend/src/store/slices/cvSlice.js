import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadCvApi, getCvAnalysisApi } from "../../api/cvApi";

// ✅ Upload CV
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

// ✅ Fetch Analysis
export const fetchCvAnalysis = createAsyncThunk(
  "cv/fetchAnalysis",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCvAnalysisApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

const cvSlice = createSlice({
  name: "cv",
  initialState: {
    loading: false,
    analysis: null,
    uploadResult: null,
    error: null,
    success: false,
  },
  reducers: {
    clearCvState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔹 Upload
      .addCase(uploadCv.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadCv.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.analysis = action.payload;
        state.uploadResult = action.payload;
      })
      .addCase(uploadCv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // 🔹 Fetch
      .addCase(fetchCvAnalysis.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCvAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.analysis = action.payload;
      })
      .addCase(fetchCvAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCvState } = cvSlice.actions;
export default cvSlice.reducer;