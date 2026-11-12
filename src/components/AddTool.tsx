"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
} from "@mui/material";

export default function AddTool({ authToken }: { authToken: string }) {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    name: "",
    description: "",
    type: "",
    link: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormValues({ name: "", description: "", type: "", link: "" });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, type, link } = formValues;
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/tool/add", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: `auth_token=${authToken}`,
      },
      body: JSON.stringify({
        name,
        description,
        type,
        link,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        handleClose();
        return data?.tools || [];
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        handleClose();
      });
  };

  const renderTextField = (
    name: keyof typeof formValues,
    label: string,
    type: string = "text",
    multiline: boolean = false,
    rows: number = 1
  ) => (
    <TextField
      margin="dense"
      name={name}
      label={label}
      type={type}
      fullWidth
      variant="outlined"
      value={formValues[name]}
      onChange={handleChange}
      required
      multiline={multiline}
      rows={rows}
    />
  );

  const categoryOptions = ["Learn", "Helper", "Work", "Job"];

  return (
    <>
      <Button color="inherit" startIcon={<AddBoxIcon />} onClick={handleOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Tool</DialogTitle>
        <DialogContent>
          <form id="add-tool-form" onSubmit={handleSubmit}>
            {renderTextField("name", "Tool Name")}
            {renderTextField("description", "Description", "text", true, 2)}
            <FormControl fullWidth margin="dense" required>
              <InputLabel id="type-label">Category</InputLabel>
              <Select
                labelId="type-label"
                name="type"
                label="Category"
                value={formValues.type}
                onChange={handleChange}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {renderTextField("link", "URL", "url")}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="add-tool-form" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
