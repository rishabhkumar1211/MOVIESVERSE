import React from "react";
import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "90vh",
    width: "96vw",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const NoPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.wrapper}>
      <Box
        component="img"
        alt="page_not_found"
        sx={{ borderRadius: "5px" }}
        src="https://cdn.vectorstock.com/i/preview-1x/39/93/error-sign-page-not-found-viewed-vector-39443993.webp"
      />
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate(-1)}
        sx={{ color: "black", marginTop: "15px", backgroundColor: "#FFDE00" }}
      >
        Go back
      </Button>
    </Box>
  );
};

export default NoPage;
