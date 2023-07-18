import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "90vh",
    width: "90vw",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Typography color="#FFDE00" variant="h3" align="center">
        Loading...
      </Typography>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
