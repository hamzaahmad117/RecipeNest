// import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "#f5f2f3",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

export default function PopupForm(props) {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [selectedOption, setSelectedOption] = useState();
  const [cookingTime, setCookingTime] = useState(30);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setCookingTime(newValue);
  };

  return (
    <>
      <Modal open={props.open} onClose={props.onClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Add Your Recipe
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Name of dish"
              name="name of dish"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description of dish"
              name="description"
              margin="normal"
            />
            <Box mt={2} mb={2}>
              <Typography gutterBottom>Cooking Time (in minutes)</Typography>
              <Slider
                value={cookingTime}
                onChange={handleSliderChange}
                step={5}
                marks
                min={10}
                max={120}
                valueLabelDisplay="auto"
              />
            </Box>
            <InputLabel id="dropdown-label">Select the Cuisine</InputLabel>
            <Select
              labelId="dropdown-label"
              value={selectedOption}
              onChange={handleChange}
              label="Options"
              fullWidth
              margin="normal"
            >
              <MenuItem value="desi">Desi</MenuItem>
              <MenuItem value="italian">Italian</MenuItem>
              <MenuItem value="British">British</MenuItem>
            </Select>
            <TextField
              fullWidth
              label="Cooking Instructions"
              name="cooking instructions"
              margin="normal"
              multiline
              rows={4}
            />
            <Box mt={2} mb={2}>
              <Typography gutterBottom>
                Upload a Picture of Your Dish
              </Typography>
              <Button variant="outlined" component="label" fullWidth>
                Upload File
                <input type="file" hidden accept="image/*" />
              </Button>
            </Box>
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
