import type { RequestHandler } from "express"
import {
  cancelServiceSchema,
  getQueuePositionSchema,
  listAllInQueueSchema,
  registerClientSchema,
} from "../schemas/clientSchema"
import { ClientService } from "../services/clientService"

export const clientController = {
  register: (async (req, res) => {
    const data = registerClientSchema.parse(req.body)
    const { id, position } = await ClientService.register(data)
    res.status(201).json({ id, position })
    return
  }) as RequestHandler,

  getQueuePosition: (async (req, res) => {
    const { id } = getQueuePositionSchema.parse(req.params)
    const { position, estimedTime } = await ClientService.getQueuePosition(id)
    res.status(200).json({ position, estimedTime })
    return
  }) as RequestHandler,

  cancelService: (async (req, res) => {
    const { id } = cancelServiceSchema.parse(req.params)
    await ClientService.cancelService(id)
    res.status(204).end()
    return
  }) as RequestHandler,

  listAllInQueue: (async (req, res) => {
    const { queueCategory } = listAllInQueueSchema.parse(req.query)
    const clients = await ClientService.listAllClientsInQueue(queueCategory)
    res.status(200).json(clients)
    return
  }) as RequestHandler,
}
