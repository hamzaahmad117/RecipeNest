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

export default function PopupRecipe(props) {
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);


    return (
        <>
            <Modal open={props.open} onClose={props.onClose}>
                <Box sx={style}>
                    <Typography variant="h6" mb={2}>Recipe</Typography>

                </Box>
            </Modal>
        </>
    );
}
