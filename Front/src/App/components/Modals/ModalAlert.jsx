import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/material/Modal";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/system/Stack";


export const ModalAlert = ({title, open, setOpen }) => {

    const onButtonSiClick= ()=>{
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
          {title}
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
