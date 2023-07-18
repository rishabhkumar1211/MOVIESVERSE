import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Whatshot, Movie, Tv, Search } from "@mui/icons-material";
import { useStyles } from "./HeaderStyles";

const NavList = () => {
  const classes = useStyles();

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bolder" : "normal",
      color: isActive ? "red" : "black",
      textDecoration: "none",
    };
  };
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        color: "black",
      }}
    >
      <NavLink to="/" style={navLinkStyles}>
        <ListItem disablePadding className={classes.list}>
          <ListItemIcon
            sx={{
              minWidth: "2px",
              color: "black",
              marginRight: "3px",
            }}
          >
            <Whatshot />
          </ListItemIcon>
          <ListItemText
            className={classes.listitem}
            primary={<Typography variant="subtitle1">Trending</Typography>}
          />
        </ListItem>
      </NavLink>
      <NavLink to="/movie/1" style={navLinkStyles}>
        <ListItem disablePadding className={classes.list}>
          <ListItemIcon
            sx={{
              minWidth: "2px",
              color: "black",
              marginRight: "3px",
            }}
          >
            <Movie />
          </ListItemIcon>
          <ListItemText
            className={classes.listitem}
            primary={<Typography>Movies</Typography>}
          />
        </ListItem>
      </NavLink>
      <NavLink to="/tv/1" style={navLinkStyles}>
        <ListItem disablePadding className={classes.list}>
          <ListItemIcon
            sx={{
              minWidth: "1px",
              color: "black",
              marginRight: "3px",
            }}
          >
            <Tv />
          </ListItemIcon>
          <ListItemText
            className={classes.listitem}
            primary={<Typography>TV</Typography>}
          />
        </ListItem>
      </NavLink>
      <NavLink to="/search" style={navLinkStyles}>
        <ListItem disablePadding className={classes.list}>
          <ListItemIcon
            sx={{
              minWidth: "10px",
              color: "black",
              marginRight: "3px",
            }}
          >
            <Search />
          </ListItemIcon>
          <ListItemText
            className={classes.listitem}
            primary={<Typography>Search</Typography>}
          />
        </ListItem>
      </NavLink>
    </List>
  );
};

export default NavList;
