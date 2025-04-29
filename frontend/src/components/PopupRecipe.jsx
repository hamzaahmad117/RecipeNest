import {
  Modal,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import EditRecipeForm from "./EditRecipeForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

export default function PopupRecipe(props) {
  const handleClose = () => props.onClose();
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/chefs/${props.chefEmail}/recipes/${props.data.id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok) {
        alert("Recipe deleted successfully!");
        props.onClose(); // close the modal
        if (props.onDelete) props.onDelete(); // trigger refresh if parent passed a callback
      } else {
        alert(result.error || "Failed to delete recipe");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting recipe");
    }
  };

  return (
    <>
      <Modal open={props.open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            {props.data.name} Recipe
          </Typography>
          <Typography variant="subtitle1" mb={1}>
            <strong>Name of Dish:</strong> {props.data.name}
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Description:</strong> {props.data.description}
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Cooking Time:</strong> {props.data.time}
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Cuisine:</strong> {props.data.cuisine}
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Cooking Instructions:</strong>
            <ol>
              {props.data.cookingInstructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </Typography>

          <Button variant="contained" onClick={handleClose} fullWidth>
            Close
          </Button>

          {props.edit && (
            <>
              <Button
                variant="contained"
                onClick={() => setEditOpen(true)}
                fullWidth
                sx={{ mt: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                fullWidth
                sx={{ mt: 1 }}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      </Modal>

      <EditRecipeForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        chefEmail={props.chefEmail}
        recipe={props.data}
      />
    </>
  );
}
