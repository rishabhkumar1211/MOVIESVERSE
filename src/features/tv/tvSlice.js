import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tvGenres: [],
  selectedTvGenres: [],
};

export const fetchTvGenres = createAsyncThunk(
  "tvGenres/fetchTvGenres",
  async () => {
    let response = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=1d7ae0508105d90d7af9b43e174d4f9d&language=en-US`
    );
    return response.data;
  }
);

const tvSlice = createSlice({
  name: "tv",
  initialState: initialState,
  reducers: {
    selectGenres: (state, action) => {
      state.tvGenres = state.tvGenres.filter(
        (gn) => gn.id !== action.payload.id
      );
      state.selectedTvGenres = [...state.selectedTvGenres, action.payload];
    },
    removeSelectedGenres: (state, action) => {
      state.selectedTvGenres = state.selectedTvGenres.filter(
        (sg) => sg.id !== action.payload.id
      );
      state.tvGenres = [...state.tvGenres, action.payload];
    },
    resetGenres: (state, action) => {
      state.tvGenres = [];
      state.selectedTvGenres = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTvGenres.fulfilled, (state, action) => {
      state.tvGenres = action.payload.genres;
    });
    builder.addCase(fetchTvGenres.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export const { reducer } = tvSlice;
export const { selectGenres, removeSelectedGenres, resetGenres } =
  tvSlice.actions;
