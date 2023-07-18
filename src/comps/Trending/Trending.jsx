import React from "react";
import { Box, Pagination, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useParams, useNavigate } from "react-router-dom";
import SingleContent from "../singleContent/SingleContent";
import { useGetTrendingDataQuery } from "../../services/tmdbCore";
import Loader from "../Loader/Loader";

const useStyles = makeStyles((theme) => ({
  pagination: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "30px auto",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
}));

const Trending = () => {
  const classes = useStyles();
  const { page } = useParams();
  const { data: trending, isFetching } = useGetTrendingDataQuery(page);
  const navigate = useNavigate();

  const handlePageChange = (event, value) => {
    window.scroll(0, 0);
    if (value === 1) {
      return navigate("/");
    }
    navigate(`/${value}`);
  };

  if (isFetching) return <Loader />;
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        textTransform="uppercase"
        py={{ xs: "15px", md: "25px" }}
        color="#fff"
      >
        Trending
      </Typography>
      <Grid
        container
        direction="row"
        spacing={4}
        alignItems="center"
        justifyContent="center"
        pb="10px"
      >
        {trending.results &&
          trending.results.map((tc) => (
            <SingleContent
              page="trending"
              key={tc.id}
              id={tc.id}
              title={tc.title || tc.name}
              posterPath={tc.poster_path}
              voteAverage={tc.vote_average}
              mediaType={tc.media_type}
            />
          ))}
      </Grid>
      <Box className={classes.pagination}>
        <Pagination
          count={trending?.total_pages > 400 ? 400 : trending?.total_pages}
          defaultPage={1}
          page={Number(page) > 1 ? Number(page) : 1}
          color="secondary"
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default React.memo(Trending);
