import { Router } from "express";
import { methods as clientesController } from "../controllers/Controller.Cliente";

const router=Router();

router.get("/list/all",clientesController.listAllClientes)
router.get("/list/:page",clientesController.listClientes)
router.get("/GetClient/:id",clientesController.listCliente)
router.put("/put/:id",clientesController.updateCliente)
router.delete("/delete/:id",clientesController.deleteCliente)
router.post("/create",clientesController.createCliente)
router.post("/login/auth",clientesController.loginCliente)
router.post("/Dummy/createDataDummy",clientesController.createDummyCliente)

export default router;