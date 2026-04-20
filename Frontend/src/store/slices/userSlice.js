// features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";


// ── Thunks ─────────────────────────────────────────────────────────────────

export const getMyInfo = createAsyncThunk(
  "user/getMyInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/my-info");
      const data = response.data;

      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user info"
      );
    }
  }
);

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async ({ userDto, cvFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(userDto));

      if (cvFile) {
        formData.append("cv", cvFile);
      }

      const response = await axiosInstance.put(
        "/user/edit-profile",
        formData
      );

      const data = response.data;

      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/user/delete-account");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete account"
      );
    }
  }
);
// ── Initial State ──────────────────────────────────────────────────────────

const initialState = {
  profile: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  success: false,
};

// ── Slice ──────────────────────────────────────────────────────────────────

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get My Info
      .addCase(getMyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getMyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Profile
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Account
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.profile = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;

export const selectProfile = (state) => state.user.profile;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const selectUserSuccess = (state) => state.user.success;