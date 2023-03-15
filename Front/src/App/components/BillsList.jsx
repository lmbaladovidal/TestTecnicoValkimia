import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFacturas } from "../../store/Bills/thunks";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Divider, List, ListItem } from "@mui/joy";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";



const ColorButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: blue[100],
  },
}));


export const BillsList = ({ cliente, open, setOpen }) => {
  const { isLoadingBills, facturas, amount } = useSelector((state) => state.facturas);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFacturas(cliente.id));
  }, []);

  const parsarTexto = (fecha) => {
    console.log("Soy fecha",fecha);
    const fechaFormateada = fecha.slice(0, 10);
    let cadAux = fechaFormateada.split("-");
    return cadAux[2] + "-" + cadAux[1] + "-" + cadAux[0];
  };
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
          maxWidth: 600,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose
          variant="outlined"
          sx={{
            top: "calc(-1/4 * var(--IconButton-size))",
            right: "calc(-1/4 * var(--IconButton-size))",
            boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
            borderRadius: "50%",
            bgcolor: "background.body",
          }}
        />
        <Typography
          textAlign={"center"}
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          {`Facturas de ${cliente.nombre}`}
        </Typography>
        <Typography
          id="modal-desc"
          textColor="text.tertiary"
          textAlign={"center"}
        >
          {facturas.length > 0
            ? "Fecha de factura e importe"
            : "Este cliente no posee facturas asociadas"}
        </Typography>
        <nav aria-label="main clients">
          <List>
            {facturas.length > 0 &&
              facturas.map((factura) => (
                <ListItem key={factura.id}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        parsarTexto(factura.fecha) + " - " + factura.importe
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
          <Divider />
        </nav>
      </Sheet>
    </Modal>
  );
};
