import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button
} from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "#fff",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function EditProfileModal({ open, onClose, profileData, onUpdated }) {
  const [form, setForm] = useState(profileData || {});

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/chefs/${form.email}`, form);
      onUpdated(form);
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Edit Profile</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="First Name" name="firstName" fullWidth margin="normal" value={form.firstName || ''} onChange={handleChange} />
          <TextField label="Last Name" name="lastName" fullWidth margin="normal" value={form.lastName || ''} onChange={handleChange} />

          <TextField label="Email" name="email" fullWidth margin="normal" value={form.email || ''} disabled />
          <TextField label="Description" name="description" fullWidth margin="normal" multiline rows={3} value={form.description || ''} onChange={handleChange} />
          <TextField label="Avatar URL" name="avatar" fullWidth margin="normal" value={form.avatar || ''} onChange={handleChange} />
          <TextField label="Twitter Link" name="twitter" fullWidth margin="normal" value={form.twitter || ''} onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth margin="normal" value={form.password || ''} onChange={handleChange} />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Save Changes</Button>
        </form>
      </Box>
    </Modal>
  );
}
