import type { RequestHandler } from "express"
import {
  cancelServiceSchema,
  getQueuePositionSchema,
  registerClientSchema,
} from "../schemas/clientSchema"
import { ClientService } from "../services/clientService"

export const clientController = {
  register: (async (req, res) => {
    try {
      const data = registerClientSchema.parse(req.body)
      const { id, position } = await ClientService.register(data)
      res.status(201).json({ id, position })
      return
    } catch (error) {
      console.error(error)
      res.status(400).json({ error })
      return
    }
  }) as RequestHandler,

  getQueuePosition: (async (req, res) => {
    try {
      const { id } = getQueuePositionSchema.parse(req.params)
      const { position, estimedTime } = await ClientService.getQueuePosition(id)
      res.status(200).json({ position, estimedTime })
      return
    } catch (error) {
      console.error(error)
      res.status(400).json({ error })
      return
    }
  }) as RequestHandler,

  cancelService: (async (req, res) => {
    try {
      const { id } = cancelServiceSchema.parse(req.params)
      await ClientService.cancelService(id)
      res.status(204).end()
      return
    } catch (error) {
      console.error(error)
      res.status(400).json({ error })
      return
    }
  }) as RequestHandler,

  listAllInQueue: (async (req, res) => {
    try {
      const clients = await ClientService.listAllClientsInQueue()
      res.status(200).json(clients)
      return
    } catch (error) {
      console.error(error)
      return
    }
  }) as RequestHandler,

  callNextClient: (async (req, res) => {
    try {
      const { called, position } = await ClientService.callNextClient()
      res.status(200).json({ called, position })
      return
    } catch (error) {
      console.error(error)
      res.status(400).json({ error })
      return
    }
  }) as RequestHandler,

  getMetrics: (async (req, res) => {
    try {
      const metrics = await ClientService.getMetrics()
      res.status(200).json(metrics)
      return
    } catch (error) {
      console.error(error)
      res.status(400).json({ error })
      return
    }
  }) as RequestHandler,
}
