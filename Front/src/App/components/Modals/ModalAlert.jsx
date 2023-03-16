import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/material/Modal";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/system/Stack";
import { useNavigate } from "react-router-dom";


export const ModalAlert = ({ title, open, setOpen, resetForm, goToHome = false }) => {

  const navigate = useNavigate()

  const onButtonSiClick = () => {
    setOpen(false)
    console.log(title.tipo);
    if(title.tipo!=0){
      goToHome ? navigate("/") : resetForm()
    }
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
          {title.titulo}
        </Typography>
        <Stack
          direction="row" spacing={2}
          alignItems='center'
          justifyContent='center'
          mt={5}
        >
          <Button onClick={onButtonSiClick}>Ok</Button>
        </Stack>
      </Sheet>
    </Modal>
  );
};
