"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  InputBase,
} from "@mui/material";

import { styled, alpha } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import SchoolIcon from "@mui/icons-material/School";
import SupportIcon from "@mui/icons-material/Support";
import WorkIcon from "@mui/icons-material/Work";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import SearchIcon from "@mui/icons-material/Search";

const navItems = [
  { label: "Home", path: "/", icon: <HomeFilledIcon /> },
  { label: "Learn", path: "/Learn", icon: <SchoolIcon /> },
  { label: "Helper", path: "/Helper", icon: <SupportIcon /> },
  { label: "Work", path: "/Work", icon: <WorkIcon /> },
  { label: "Job", path: "/Job", icon: <ModelTrainingIcon /> },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <AutoFixHighIcon sx={{ mr: 1 }} />
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            {navItems.map((item) => (
              <Link key={item.label} href={item.path}>
                <Button color="inherit" startIcon={item.icon}>
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>

          <IconButton
            color="inherit"
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
          <List>
            {navItems.map((item) => (
              <Link key={item.label} href={item.path}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
