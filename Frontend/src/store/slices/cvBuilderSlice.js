import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cvList: [],
  currentCV: null,
  isDirty: false,
};

const cvBuilderSlice = createSlice({
  name: "cvBuilder",
  initialState,
  reducers: {
    setCVList: (state, action) => {
      state.cvList = action.payload;
    },

    setCurrentCV: (state, action) => {
      state.currentCV = action.payload;
      state.isDirty = false;
    },

    updateField: (state, action) => {
      const { field, value } = action.payload;

      if (!state.currentCV) return;

      state.currentCV = {
        ...state.currentCV,
        [field]: value,
      };

      state.isDirty = true;
    },

    markSaved: (state) => {
      state.isDirty = false;
    },

    resetCV: (state) => {
      state.currentCV = null;
      state.isDirty = false;
    },
  },
});

export const {
  setCVList,
  setCurrentCV,
  updateField,
  markSaved,
  resetCV,
} = cvBuilderSlice.actions;

export default cvBuilderSlice.reducer;