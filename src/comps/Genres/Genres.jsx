import React from "react";
import { Chip, Box } from "@mui/material";
import { useStyles } from "./genresStyles";

const Genres = (prop) => {
  const {
    genres,
    selectedGenres,
    selectedGenreHandler,
    selectedDeletionHandler,
  } = prop;
  const classes = useStyles();

  return (
    <Box className={classes.chipBox}>
      {selectedGenres &&
        selectedGenres.map((sg) => (
          <Chip
            key={sg.id}
            label={sg.name}
            clickable
            size="medium"
            color="success"
            variant="outlined"
            onDelete={() => selectedDeletionHandler(sg)}
            sx={{ margin: "5px" }}
            className={classes.chip}
          />
        ))}

      {genres &&
        genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            clickable
            onClick={() => selectedGenreHandler(genre)}
            size="medium"
            variant="outlined"
            sx={{ margin: "5px" }}
            className={classes.chip}
          />
        ))}
    </Box>
  );
};

export default React.memo(Genres);
