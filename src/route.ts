import { Router } from "express"
import { clientController } from "./controllers/clientController"
import { queueController } from "./controllers/queueController"

export const router = Router()

router.post("/queue", clientController.register)
router.get("/queue/:id/position", clientController.getQueuePosition)
router.delete("/queue/:id", clientController.cancelService)
router.get("/queue", clientController.listAllInQueue)
router.post("/queue/next", queueController.callNextClient)
router.get("/admin/metrics", queueController.getMetrics)
