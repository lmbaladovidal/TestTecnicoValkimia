import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/material/Modal";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/system/Stack";
import { useDispatch } from "react-redux";
import { deleteCliente, getClientes } from "../../store/Clients/thunks";

export const ModalDelete = ({ cliente, open, setOpen }) => {

    const dispatch = useDispatch();

    const onButtonNoClick = ()=>{
        setOpen(false)
    }

    const onButtonSiClick= ()=>{
        console.log("click en si con id cliente:",cliente.id)
        dispatch(deleteCliente(cliente.id))
        dispatch(getClientes())
        setOpen(false)
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
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          {`Desea eliminar a ${cliente.nombre}`}
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
  );
};
