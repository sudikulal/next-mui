import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoginIcon from "@mui/icons-material/Login";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, Button } from "@mui/material";

export default function Login() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [authToken, setAuthToken] = React.useState(
    Cookies.get("auth_token") || ""
  );

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const password = formJson.password as string;

    if (!authToken) {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          Cookies.set("auth_token", data?.access_token || "", { path: "/" });
          setAuthToken(data?.access_token);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });

      setOpen(false);
      router.refresh();
    }
  };

  return (
    <Box>
      {authToken ? (
        <Button color="inherit" startIcon={<AddBoxIcon />}>
          Add
        </Button>
      ) : (
        <Button
          color="inherit"
          startIcon={<LoginIcon />}
          onClick={handleClickOpen}
        >
          Login
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add or update the tool, please enter admin password.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
