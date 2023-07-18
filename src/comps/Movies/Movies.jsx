import React, { useEffect, useCallback } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovieGenres,
  selectGenres,
  removeSelectedGenres,
} from "../../features/movies/moviesSlice";
import SingleContent from "../singleContent/SingleContent";
import CustomPagination from "../customPagination/CustomPagination";
import Loader from "../Loader/Loader";
import Genres from "../Genres/Genres";
import useGenre from "../Genres/useGenre";
import { useGetMoviesQuery } from "../../services/tmdbCore";

const Movies = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { moviesGenres, moviesSelectedGenres } = useSelector(
    (state) => state.movies
  );
  const genreForUrl = useGenre(moviesSelectedGenres);
  const { data: moviesData, isFetching } = useGetMoviesQuery({
    page,
    genreForUrl,
  });

  useEffect(() => {
    if (!moviesGenres.length) {
      dispatch(fetchMovieGenres());
    }
  }, [dispatch]);

  const selectedGenreHandler = useCallback((genre) => {
    dispatch(selectGenres(genre));
    navigate("/movie/1");
  }, []);

  const selectedDeletionHandler = useCallback((genre) => {
    dispatch(removeSelectedGenres(genre));
    navigate("/movie/1");
  }, []);

  if (isFetching) return <Loader />;
  return (
    <Container maxWidth="lg">
      <Typography align="center" variant="h4" pt="30px" color="#fff">
        MOVIES
      </Typography>
      <Box py="15px" textAlign="center">
        <Genres
          genres={moviesGenres}
          selectedGenres={moviesSelectedGenres}
          selectedGenreHandler={selectedGenreHandler}
          selectedDeletionHandler={selectedDeletionHandler}
        />
      </Box>
      <Grid
        container
        spacing={4}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {moviesData &&
          moviesData.results.map((mc) => (
            <SingleContent
              key={mc.id}
              id={mc.id}
              mediaType="movie"
              title={mc.title || mc.original_title}
              posterPath={mc.poster_path}
              voteAverage={mc.vote_average}
            />
          ))}
      </Grid>
      <CustomPagination
        type="movie"
        page={page}
        totalPage={
          moviesData && moviesData?.total_pages > 400
            ? 400
            : moviesData?.total_pages
        }
      />
    </Container>
  );
};

export default React.memo(Movies);
