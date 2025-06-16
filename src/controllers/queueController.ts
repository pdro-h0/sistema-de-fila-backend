import { RequestHandler } from "express"
import { QueueService } from "../services/queueService"

export const queueController = {
  getMetrics: (async (req, res) => {
    const metrics = await QueueService.getMetrics()
    res.status(200).json(metrics)
    return
  }) as RequestHandler,

  callNextClient: (async (req, res) => {
    const { called, position } = await QueueService.callNextClient()
    res.status(200).json({ called, position })
    return
  }) as RequestHandler,
}
