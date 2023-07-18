import { configureStore } from "@reduxjs/toolkit";
import { reducer as moviesReducer } from "./movies/moviesSlice";
import { reducer as tvReducer } from "./tv/tvSlice";
import { reducer as searchReducer } from "./search/searchSlice";
import { tmdbCoreApi } from "../services/tmdbCore";

const store = configureStore({
  reducer: {
    [tmdbCoreApi.reducerPath]: tmdbCoreApi.reducer,
    movies: moviesReducer,
    tv: tvReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbCoreApi.middleware),
});

export default store;
