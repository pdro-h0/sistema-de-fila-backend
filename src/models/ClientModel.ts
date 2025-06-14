import { db } from "../lib/prisma"
import { HistoryModel } from "./HistoryModel"

export class ClientModel {
  id: string
  name: string
  category: string
  priority: string
  contact: string
  queueId: string
  status: string
  createdAt: Date
  histories: HistoryModel[]
  constructor(data: Partial<ClientModel> = {}) {
    this.fill(data)
  }

  static async create(data: {
    name: string
    category: string
    priority: string
    contact: string
    queueId: string
  }) {
    return await db.client.create({
      data: {
        name: data.name,
        category: data.category,
        priority: data.priority,
        contact: data.contact,
        queueId: data.queueId,
      },
    })
  }

  static async countByQueueId(queueId: string, status: string) {
    return await db.client.count({
      where: {
        queueId,
        status,
      },
    })
  }

  static async findById(id: string) {
    return db.client.findUnique({ where: { id } })
  }

  static async findClientsInQueue(status: string, queueId?: string) {
    return db.client.findMany({
      where: {
        queueId,
        status,
      },
      orderBy: {
        createdAt: "asc",
      },
    })
  }
  static async update(id: string, status: string) {
    await db.client.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })
  }

  static async findClientsAlreadyCalled() {
    return db.client.findMany({
      where: {
        status: "Called",
      },
      include: {
        histories: true,
      },
    })
  }

  fill(data: Partial<ClientModel>): void {
    if (data.id !== undefined) this.id = data.id
    if (data.name !== undefined) this.name = data.name
    if (data.category !== undefined) this.category = data.category
    if (data.priority !== undefined) this.priority = data.priority
    if (data.contact !== undefined) this.contact = data.contact
    if (data.queueId !== undefined) this.queueId = data.queueId
    if (data.status !== undefined) this.status = data.status
    if (data.createdAt !== undefined) this.createdAt = data.createdAt
    if (data.histories !== undefined) this.histories = data.histories
  }
}
