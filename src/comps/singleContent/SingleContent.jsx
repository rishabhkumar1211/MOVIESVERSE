import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Box,
} from "@mui/material";
import { img_300, unavailable } from "../../utils";
import { useStyles } from "./singleContentStyle";
import { Link } from "react-router-dom";

const SingleContent = ({
  page,
  id,
  title,
  posterPath,
  voteAverage,
  mediaType,
}) => {
  const classes = useStyles();
  const voteAverageColor = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <Grid item xs={11} sm={5} md={4} lg={3}>
      <Link
        to={`/info/${mediaType}/${id}`}
        onClick={() => window.scroll(0, 0)}
        style={{
          textDecoration: "none",
        }}
      >
        <Card className={classes.card}>
          <CardMedia
            component="img"
            loading="lazy"
            className={classes.cardImg}
            alt={title}
            height="310px"
            style={{ objectFit: "fill" }}
            image={posterPath ? `${img_300}${posterPath}` : unavailable}
          />
          <CardContent>
            {(page === "trending" || page === "search") && (
              <Typography
                variant="subtitle2"
                textTransform="capitalize"
                align="center"
              >
                {mediaType}
              </Typography>
            )}
            <Box className={classes.cardBox}>
              <Typography variant="body1" fontWeight="bold">
                {title}
              </Typography>
              {voteAverage !== 0 && (
                <Box>
                  <Typography
                    sx={{
                      padding: "7px 9px",
                      color: "#fff",
                      fontWeight: "bold",
                      backgroundColor: voteAverageColor(voteAverage),
                      borderRadius: "100%",
                    }}
                  >
                    {voteAverage && voteAverage.toFixed(1)}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default React.memo(SingleContent);
