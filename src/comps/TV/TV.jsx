import React, { useEffect, useCallback } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SingleContent from "../singleContent/SingleContent";
import CustomPagination from "../customPagination/CustomPagination";
import Genres from "../Genres/Genres";
import useGenre from "../Genres/useGenre";
import {
  fetchTvGenres,
  selectGenres,
  removeSelectedGenres,
} from "../../features/tv/tvSlice";
import { useGetTvDataQuery } from "../../services/tmdbCore";
import Loader from "../Loader/Loader";

const TV = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const { tvGenres, selectedTvGenres } = useSelector((state) => state.tv);
  const genreForUrl = useGenre(selectedTvGenres);
  const { data: tvData, isFetching } = useGetTvDataQuery({ page, genreForUrl });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tvGenres.length) {
      dispatch(fetchTvGenres());
    }
  }, [dispatch]);

  const selectedGenreHandler = useCallback((genre) => {
    dispatch(selectGenres(genre));
    navigate("/tv/1");
  }, []);

  const selectedDeletionHandler = useCallback((genre) => {
    dispatch(removeSelectedGenres(genre));
    navigate("/tv/1");
  }, []);

  if (isFetching) return <Loader />;
  return (
    <Container maxWidth="lg">
      <Typography align="center" variant="h4" pt="35px" color="#fff">
        TV
      </Typography>
      <Box py="16px" textAlign="center">
        <Genres
          genres={tvGenres}
          selectedGenres={selectedTvGenres}
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
        {tvData &&
          tvData.results?.map((tc) => (
            <SingleContent
              key={tc.id}
              id={tc.id}
              mediaType="tv"
              title={tc.name || tc.original_name}
              posterPath={tc.poster_path}
              voteAverage={tc.vote_average}
            />
          ))}
      </Grid>
      <CustomPagination
        type="tv"
        page={page}
        totalPage={tvData?.total_pages > 200 ? 200 : tvData?.total_pages}
      />
    </Container>
  );
};

export default React.memo(TV);
