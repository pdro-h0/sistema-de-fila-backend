import { Router } from "express";
import { clientController } from "./controllers/clientController";

export const router = Router()

router.post("/queue", clientController.register)
router.get("/queue/:id/position", clientController.getQueuePosition)
