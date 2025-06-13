import { Router } from "express"
import { clientController } from "./controllers/clientController"

export const router = Router()

router.post("/queue", clientController.register)
router.get("/queue/:id/position", clientController.getQueuePosition)
router.delete("/queue/:id", clientController.cancelService)
router.get("/queue", clientController.listAllInQueue)
router.post("/queue/next", clientController.callNextClient)
router.get("/admin/metrics", clientController.getMetrics)
