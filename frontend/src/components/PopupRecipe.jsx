import { Modal, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import EditRecipeForm from "./EditRecipeForm"; // adjust path

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
  //console.log(props.data);
  console.log(props.chefEmail);


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
          {props.edit ? (<Button variant="contained" onClick={() => setEditOpen(true)} fullWidth sx={{ mt: 1 }}>
            Edit
          </Button>) : null}
          
        </Box>
      </Modal>

      {/* Edit Modal */}
      <EditRecipeForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        chefEmail={props.chefEmail}
        recipe={props.data}
      />
    </>
  );
}
