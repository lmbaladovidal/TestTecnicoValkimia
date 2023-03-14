import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFacturas } from "../../store/Bills/thunks";
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export const BillsList = ({ cliente,open,setOpen }) => {
  const { isLoadingBills, facturas, amount } = useSelector(
    (state) => state.facturas
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFacturas());
  }, []);

  useEffect(() => {
    if (facturas.length > 0) {
      console.log("facturas cargadas");
    }
  }, [isLoadingBills]);

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
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            {`Facturas de ${cliente}`}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Esto es una prueba para mostrar facturas
          </Typography>
        </Sheet>
      </Modal>
  );
};
