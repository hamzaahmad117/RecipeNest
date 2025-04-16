// import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function PopupForm(props) {
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);


    return (
        <>
            <Modal open={props.open} onClose={props.onClose}>
                <Box sx={style}>
                    <Typography variant="h6" mb={2}>Fill the form</Typography>
                    <form >
                    <TextField
              fullWidth
              label="Name"
              name="name"
            //   value={formData.name}
            //   onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value="none"
              margin="normal"
            />
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Submit</Button>

                    </form>
                </Box>
            </Modal>
        </>
    );
}
