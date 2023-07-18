import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchData: [],
  searchText: "",
};

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (args) => {
    const { searchQuery, page } = args;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=1d7ae0508105d90d7af9b43e174d4f9d&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`
    );
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    resetSearchData: (state, action) => {
      state.searchData = [];
      state.searchText = "";
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchData = action.payload;
    });
    builder.addCase(fetchSearch.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export const { reducer } = searchSlice;
export const { setSearchText, resetSearchData } = searchSlice.actions;
