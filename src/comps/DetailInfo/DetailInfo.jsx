import {
  Container,
  Stack,
  Box,
  Grid,
  Card,
  CardMedia,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useStyles } from "./DetailInfoStyles";
import { img_300, unavailable } from "../../utils";
import { useGetDetailInfoQuery } from "../../services/tmdbCore";
const MoreInfo = lazy(() => import("./MoreInfo"));
const SocialMediaHandles = lazy(() => import("./SocialMediaHandles"));

const DetailInfo = () => {
  const { id, type } = useParams();
  const classes = useStyles();
  const [isReadMore, setIsReadMore] = useState(true);
  const { data: content } = useGetDetailInfoQuery({ type, id });

  const handleIsReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const durToHr = (duration) => {
    let hr = Math.floor(duration / 60);
    let min = Math.floor(duration % 60);

    if (!hr & !min) {
      return "";
    }
    if (hr === 0) {
      return `${min}min`;
    } else if (min === 0) {
      return `${hr}h`;
    } else {
      return `${hr}h ${min}min`;
    }
  };

  return (
    <>
      {content && (
        <Box
          className={classes.parentBox}
          sx={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.8),rgba(0, 0, 0,0.8)),url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${content?.backdrop_path})`,
          }}
        >
          <Box>
            <Container maxWidth="lg">
              <Grid container justifyContent="center" columnSpacing={5}>
                <Grid item xs={12} sm={5.5} md={5} lg={3.5}>
                  <Card
                    sx={{
                      marginTop: "15px",
                      height: "440px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="poster"
                      height="440px"
                      style={{ objectFit: "fill" }}
                      image={
                        content?.poster_path
                          ? `${img_300}${content?.poster_path}`
                          : unavailable
                      }
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={11} md={11} lg={7}>
                  <Box className={classes.gridItem2}>
                    <Box display="flex" color="#fff">
                      <Typography sx={{ fontSize: { xs: "20px", md: "40px" } }}>
                        {content?.title || content?.name}
                      </Typography>
                      &nbsp;&nbsp;
                      <Typography sx={{ fontSize: { xs: "20px", md: "40px" } }}>
                        (
                        {content?.release_date?.split("-")[0] ||
                          content?.first_air_date?.split("-")[0]}
                        )
                      </Typography>
                    </Box>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      my={1}
                    >
                      <Typography sx={{ fontSize: { xs: "15px", md: "22px" } }}>
                        {type === "movie"
                          ? durToHr(content?.runtime)
                          : durToHr(content?.episode_run_time)}
                      </Typography>
                      {content?.runtime || content?.episode_run_time ? (
                        <span>•</span>
                      ) : null}
                      <Typography
                        sx={{
                          fontSize: { xs: "15px", md: "22px" },
                          textAlign: { xs: "center", md: "initial" },
                        }}
                      >
                        {content &&
                          content?.genres.map((item) => item.name).join(", ")}
                      </Typography>
                    </Stack>
                    {(content?.release_date || content?.first_air_date) && (
                      <Typography
                        sx={{ fontSize: { xs: "15px", md: "21px" } }}
                        gutterBottom
                      >
                        Release Date :{" "}
                        {new Date(
                          content?.release_date || content?.first_air_date
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </Typography>
                    )}
                    <Box>
                      <Suspense fallback={<CircularProgress />}>
                        <SocialMediaHandles id={id} type={type} />
                      </Suspense>
                    </Box>
                    {content.overview && (
                      <Box>
                        <Typography variant="h5" mt={1}>
                          Overview
                        </Typography>
                        <Typography className={classes.overViewText}>
                          {isReadMore
                            ? content?.overview.slice(0, 150)
                            : content?.overview}

                          <Typography
                            onClick={handleIsReadMore}
                            className={classes.overviewReadMore}
                          >
                            {isReadMore ? " ...readMore" : " showLess"}
                          </Typography>
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      )}
      <Divider color="gray" />
      <Suspense fallback={<CircularProgress />}>
        <MoreInfo id={id} type={type} />
      </Suspense>
    </>
  );
};

export default React.memo(DetailInfo);
