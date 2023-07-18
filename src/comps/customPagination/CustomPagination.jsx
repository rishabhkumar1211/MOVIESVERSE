import React from "react";
import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

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
const CustomPagination = ({ type, page, totalPage }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handlePageChange = (event, value) => {
    window.scroll(0, 0);
    navigate(`/${type}/${value}`);
  };
  return (
    <Box className={classes.pagination}>
      <Pagination
        count={totalPage}
        defaultPage={1}
        page={Number(page)}
        color="secondary"
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default React.memo(CustomPagination);
