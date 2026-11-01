import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createResearchRequest,
  fetchResearchByIdRequest,
  fetchResearchesRequest,
  deleteResearchRequest,
} from "../../services/researchService";

// Convert Axios errors into readable messages
const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.message ||
  "Something went wrong. Please try again.";

// Create research
export const createResearch = createAsyncThunk(
  "research/create",
  async (question, { rejectWithValue }) => {
    try {
      return await createResearchRequest(question);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// Fetch all research
export const fetchResearches = createAsyncThunk(
  "research/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchResearchesRequest();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// Fetch research by ID
export const fetchResearchById = createAsyncThunk(
  "research/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchResearchByIdRequest(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// Delete research
export const deleteResearch = createAsyncThunk(
  "research/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteResearchRequest(id);
      return Number(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const initialState = {
  researches: [],
  currentResearch: null,

  loading: false,
  creating: false,
  deleting: false,

  error: null,
  createError: null,
};

const researchSlice = createSlice({
  name: "research",
  initialState,

  reducers: {
    clearResearchError: (state) => {
      state.error = null;
      state.createError = null;
    },

    clearCurrentResearch: (state) => {
      state.currentResearch = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Create research
      .addCase(createResearch.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createResearch.fulfilled, (state, action) => {
        state.creating = false;
        state.currentResearch = action.payload;

        state.researches = [
          action.payload,
          ...state.researches.filter((item) => item.id !== action.payload.id),
        ];
      })
      .addCase(createResearch.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // Fetch all research
      .addCase(fetchResearches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResearches.fulfilled, (state, action) => {
        state.loading = false;
        state.researches = action.payload;
      })
      .addCase(fetchResearches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch research by ID
      .addCase(fetchResearchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResearchById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResearch = action.payload;
      })
      .addCase(fetchResearchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete research
      .addCase(deleteResearch.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteResearch.fulfilled, (state, action) => {
        state.deleting = false;

        state.researches = state.researches.filter(
          (item) => item.id !== action.payload,
        );

        if (state.currentResearch?.id === action.payload) {
          state.currentResearch = null;
        }
      })
      .addCase(deleteResearch.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export const { clearResearchError, clearCurrentResearch } =
  researchSlice.actions;

export default researchSlice.reducer;
