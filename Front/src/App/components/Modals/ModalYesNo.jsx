import { Sheet } from '@mui/joy';
import { Button, Modal, Stack, Typography } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';

export const ModalYesNo = ({ functionToDispatch, dataDispatch, titulo, open, setOpen, setOpenAlert }) => {

    const dispatch = useDispatch();

    const onButtonNoClick = () => {
        setOpen(false)
    }

    const onButtonSiClick = () => {
        dispatch(functionToDispatch(dataDispatch))
        setOpen(false)
        setOpenAlert(true)
    }
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
        <Sheet
            variant="outlined"
            sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
            }}
        >
            <Typography
                textAlign={"center"}
                component="h2"
                id="modal-title"
                level="h4"
                textcolor="inherit"
                fontWeight="lg"
                mb={1}
            >
                {titulo}
            </Typography>
            <Stack
                direction="row" spacing={2}
                alignItems='center'
                justifyContent='center'
                mt={5}
            >
                <Button onClick={onButtonSiClick}>Si</Button>
                <Button onClick={onButtonNoClick}>No</Button>
            </Stack>
        </Sheet>
        </Modal>
    )
}
