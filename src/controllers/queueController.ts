import { RequestHandler } from "express"
import { QueueService } from "../services/queueService"

export const queueController = {
  getMetrics: (async (req, res) => {
    try {
      const metrics = await QueueService.getMetrics()
      res.status(200).json(metrics)
      return
    } catch (error) {
      console.error(error)
      res.status(400).json({ error })
      return
    }
  }) as RequestHandler,

  callNextClient: (async (req, res) => {
    try {
      const { called, position } = await QueueService.callNextClient()
      res.status(200).json({ called, position })
      return
    } catch (error) {
      console.error(error)
      res.status(400).json({ error })
      return
    }
  }) as RequestHandler,
}
