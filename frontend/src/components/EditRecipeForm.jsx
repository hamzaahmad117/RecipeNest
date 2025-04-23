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
import { useState, useEffect } from "react";

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

export default function EditRecipeForm({ open, onClose, chefEmail, recipe }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState(30);
  const [cuisine, setCuisine] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
console.log(chefEmail)
  useEffect(() => {
    if (recipe) {
    console.log("Recipe data:", recipe.id);
      setName(recipe.name);
      setDescription(recipe.description);
      setCookingTime(parseInt(recipe.time)); // assuming it's "30 minutes"
      setCuisine(recipe.cuisine);
      setInstructions(recipe.cookingInstructions?.join("\n"));
      setImageUrl(recipe.avatar);
    }
  }, [recipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      name,
      description,
      time: `${cookingTime} minutes`,
      cuisine,
      cookingInstructions: instructions
        .split("\n")
        .map((instr) => instr.trim())
        .filter((instr) => instr.length > 0),
      avatar: imageUrl,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/chefs/${chefEmail}/recipes/${recipe.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Recipe updated successfully!");
        onClose(); // close modal
      } else {
        alert(data.error || "Failed to update recipe");
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
          Edit Your Recipe
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name of dish" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
          <TextField fullWidth label="Description of dish" value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" />
          <Box mt={2} mb={2}>
            <Typography gutterBottom>Cooking Time (in minutes)</Typography>
            <Slider value={cookingTime} onChange={(e, newVal) => setCookingTime(newVal)} step={5} marks min={10} max={120} valueLabelDisplay="auto" />
          </Box>
          <InputLabel id="dropdown-label">Select the Cuisine</InputLabel>
          <Select labelId="dropdown-label" value={cuisine} onChange={(e) => setCuisine(e.target.value)} fullWidth margin="normal">
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
          <TextField fullWidth label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} margin="normal" />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
