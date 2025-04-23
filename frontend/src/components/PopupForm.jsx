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

export default function PopupForm({ open, onClose, chefEmail }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState(30);
  const [cuisine, setCuisine] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Assuming user pastes a link for now

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      name,
      description,
      time: `${cookingTime} minutes`,
      cuisine,
      cookingInstructions: instructions
      .split("\n")
      .map(instr => instr.trim())
      .filter(instr => instr.length > 0),
      avatar: imageUrl,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/chefs/${chefEmail}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Recipe added successfully!");
        onClose(); // close modal
      } else {
        alert(data.error || "Failed to add recipe");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Add Your Recipe
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name of dish"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description of dish"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <Box mt={2} mb={2}>
            <Typography gutterBottom>Cooking Time (in minutes)</Typography>
            <Slider
              value={cookingTime}
              onChange={(e, newVal) => setCookingTime(newVal)}
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
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Desi">Desi</MenuItem>
            <MenuItem value="Western">Western</MenuItem>
            <MenuItem value="British">British</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Cooking Instructions (one step per line)"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
