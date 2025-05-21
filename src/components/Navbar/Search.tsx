import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Box } from "@mui/material";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = React.useState(searchParams.get("search") || "");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const params = new URLSearchParams(searchParams);
    value ? params.set("search", value) : params.delete("search");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 1,
        px: 2,
        py: 0.5,
        width: "100%",
        maxWidth: 500,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.25)",
        },
      }}
    >
      <SearchIcon sx={{ mr: 1 }} />
      <InputBase
        value={search}
        onChange={handleSearchChange}
        placeholder="Search…"
        fullWidth
        inputProps={{ "aria-label": "search" }}
        sx={{ color: "inherit" }}
      />
    </Box>
  );
}
