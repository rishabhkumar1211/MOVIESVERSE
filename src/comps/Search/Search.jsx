import React, { useEffect, useRef } from "react";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SingleContent from "../singleContent/SingleContent";
import SearchUtils from "./SearchUtils/SearchUtils";
import SearchStates from "./SearchUtils/SearchStates";
import { makeStyles } from "@mui/styles";
import { fetchSearch } from "../../features/search/searchSlice";

const useStyles = makeStyles((theme) => ({
  pagination: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "40px 0 30px 0",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
}));

const Search = () => {
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search.searchData);
  let totalSearchPages = useRef();
  totalSearchPages.current = searchState?.total_pages;

  const searchQuery = searchParams.get("query");
  const page = searchParams.get("page");

  useEffect(() => {
    if (searchQuery && page) {
      dispatch(fetchSearch({ searchQuery, page }));
    }
  }, [dispatch, searchQuery, page]);

  const handlePageChange = (current, value) => {
    setSearchParams({ query: searchQuery, page: value });
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: "100px" }}>
        <SearchUtils />
        <Container maxWidth="lg" disableGutters>
          <Grid
            container
            direction="row"
            spacing={4}
            alignItems="center"
            justifyContent="center"
            py={2}
          >
            {searchState.length === 0 && (
              <SearchStates
                url={
                  "https://cdn-icons-png.flaticon.com/512/437/437972.png?w=740&t=st=1666180702~exp=1666181302~hmac=1ec5777a85c65e1c53f516a9dbe9caae2a61e8bc7b8a7009f2e62211a333408e"
                }
                text="Search Your Favourite Movie Or Tv Show"
              />
            )}
            {searchState?.total_results !== 0 ? (
              searchState?.results &&
              searchState?.results.map((c) => (
                <SingleContent
                  page="search"
                  key={c.id}
                  id={c.id}
                  title={c.title || c.name}
                  posterPath={c.poster_path}
                  voteAverage={c.vote_average}
                  mediaType={c.media_type}
                />
              ))
            ) : (
              <SearchStates
                url={
                  "https://img.freepik.com/premium-vector/no-data-concept-illustration_203587-28.jpg?w=740"
                }
                text="No Results Found"
              />
            )}
          </Grid>
          {totalSearchPages.current >= 1 && (
            <Box className={classes.pagination}>
              <Pagination
                count={totalSearchPages.current}
                defaultPage={1}
                page={Number(page)}
                color="secondary"
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
              />
            </Box>
          )}
        </Container>
      </Box>
    </Container>
  );
};

export default React.memo(Search);
