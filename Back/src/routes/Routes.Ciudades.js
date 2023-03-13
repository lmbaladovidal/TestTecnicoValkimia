import { Router } from "express";
import { methods as controllerCiudad } from "../controllers/Controller.Ciudad";

const router = Router();

router.get("/list", controllerCiudad.getCiudades);
router.post("/Dummy/createDataDummy", controllerCiudad.createDummyCiudad);

export default router;
