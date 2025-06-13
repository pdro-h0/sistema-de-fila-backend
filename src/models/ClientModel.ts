import { db } from "../lib/prisma"

export class ClientModel {
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
}
