import { Router } from "express";
import { methods as clientesController } from "../controllers/Controller.Cliente";

const router=Router();

router.get("/list/all",clientesController.listAllClientes)
router.get("/list/:page",clientesController.listClientes)
router.get("/GetClient/:id",clientesController.listCliente)
router.post("/Dummy/createDataDummy",clientesController.createDummyCliente)
router.post("/create",clientesController.createCliente)
router.put("/put/:id",clientesController.updateCliente)
router.delete("/delete/:id",clientesController.deleteCliente)

export default router;