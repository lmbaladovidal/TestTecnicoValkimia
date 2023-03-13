import { Router } from "express";
import { methods as controllerFactura } from "../controllers/Controller.Factura";

const router = Router();

router.get("/list/:idCliente",controllerFactura.listFacturasxCliente)
router.post("/create", controllerFactura.createFactura);
router.post("/Dummy/createDataDummy", controllerFactura.createDummyFactura);

export default router;
