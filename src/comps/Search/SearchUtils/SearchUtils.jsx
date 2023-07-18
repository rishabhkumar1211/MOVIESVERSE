import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import {
  setSearchText,
  resetSearchData,
} from "../../../features/search/searchSlice";
import axios from "axios";

const SearchUtils = () => {
  const [suggestions, setSuggestions] = useState([]);
  const searchText = useSelector((state) => state.search.searchText);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [skipSuggestion, setSkipSuggestion] = useState(false);

  useEffect(() => {
    if (searchText && !skipSuggestion) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=1d7ae0508105d90d7af9b43e174d4f9d&language=en-US&query=${searchText}&include_adult=false`
        )
        .then((response) => {
          setSuggestions(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchText, skipSuggestion]);

  const handleTextChange = (e) => {
    // setSkipSuggestion(false);
    let value = e.target.value;
    if (value === " ") {
      setSuggestions([]);
    }
    dispatch(setSearchText(value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query: `${searchText}`, page: 1 });
    setSuggestions([]);
  };

  const handleTextClear = () => {
    setSearchParams();
    dispatch(resetSearchData());
    setSuggestions([]);
  };

  let suggestionHandler = (text) => {
    setSkipSuggestion(true);
    setSuggestions([]);
    dispatch(setSearchText(text));
    setSearchParams({ query: `${text}`, page: 1 });
  };
  return (
    <Container maxWidth="md" disableGutters>
      <Box>
        <form style={{ marginBottom: "20px" }} onSubmit={handleSubmit}>
          <Stack direction="row" spacing={1}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              fullWidth
              value={searchText}
              onChange={handleTextChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#FFDE00" }} />
                  </InputAdornment>
                ),
                endAdornment: searchText && (
                  <InputAdornment position="end">
                    <Tooltip title="Clear Text" arrow>
                      <IconButton onClick={handleTextClear}>
                        <CancelIcon sx={{ color: "#FFDE00" }} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              size="large"
              disabled={!searchText}
              type="submit"
              sx={{
                margin: "0 7px",
                height: "65px",
                width: { xs: "70px", md: "140px" },
                letterSpacing: "1.4px",
                backgroundColor: "black",
                color: "#FFDE00",
              }}
            >
              Search
            </Button>
          </Stack>
          {suggestions.length > 0 && (
            <Box
              sx={{
                position: "absolute",
                backgroundColor: "#FFDE00",
                color: "black",
                borderRadius: "5px",
                maxHeight: "280px",
                width: { xs: "18rem", sm: "35rem", md: "48rem" },
                maxWidth: { xs: "18rem", sm: "35rem", md: "48rem" },
                overflowY: "scroll",
                zIndex: 10,
                "&::-webkit-scrollbar": {
                  width: "2px",
                },
              }}
            >
              <List>
                {suggestions
                  ?.filter((suggestion) =>
                    (suggestion.title || suggestion.name)
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((suggestion) => (
                    <Box key={suggestion.id}>
                      <ListItemButton
                        onClick={() =>
                          suggestionHandler(suggestion.title || suggestion.name)
                        }
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight="bold">
                              {suggestion.title || suggestion.name}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                      <Divider />
                    </Box>
                  ))}
              </List>
            </Box>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default React.memo(SearchUtils);
