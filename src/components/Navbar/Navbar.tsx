"use client";

import { AppBar, Box, Button, Toolbar } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import Filter from "./Filter";
import SearchBar from "./Search";
import Login from "./Login";

export default function Navbar() {
  
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <AutoFixHighIcon sx={{ mr: 1 }} />
          </Box>
          <SearchBar />
          <Filter />
          <Login />
        </Toolbar>
      </AppBar>
    </>
  );
}

