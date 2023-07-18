import { memo } from "react";
import { useGetSocialHandlesQuery } from "../../services/tmdbCore";
import { Stack, Link, Tooltip, Box } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const SocialMediaHandles = ({ id, type }) => {
  const { data: content } = useGetSocialHandlesQuery({ type, id });

  return (
    <Stack direction="row" spacing={2}>
      {content?.facebook_id === null || !content?.facebook_id.length ? null : (
        <Box>
          <Tooltip title="Visit Facebook" arrow>
            <Link
              href={`https://www.facebook.com/${content?.facebook_id}`}
              target="_blank"
              color="inherit"
              rel="noopener"
            >
              <Facebook sx={{ "&:hover": { color: "#4267B2" } }} />
            </Link>
          </Tooltip>
        </Box>
      )}
      {content?.instagram_id === null ||
      !content?.instagram_id.length ? null : (
        <Box>
          <Tooltip title="Visit Instagram" arrow>
            <Link
              href={`https://www.instagram.com/${content?.instagram_id}`}
              target="_blank"
              color="inherit"
              rel="noopener"
            >
              <Instagram sx={{ "&:hover": { color: "#E1306C" } }} />
            </Link>
          </Tooltip>
        </Box>
      )}
      {content?.twitter_id === null || !content?.twitter_id.length ? null : (
        <Box>
          <Tooltip title="Visit Twitter" arrow>
            <Link
              href={`https://www.twitter.com/${content?.twitter_id}`}
              target="_blank"
              color="inherit"
              rel="noopener"
            >
              <Twitter sx={{ "&:hover": { color: "#1DA1F2" } }} />
            </Link>
          </Tooltip>
        </Box>
      )}
    </Stack>
  );
};

export default memo(SocialMediaHandles);
