import { db } from "../lib/prisma"
import { ClientModel } from "./ClientModel"

export class QueueModel {
  id: string
  category: string
  clients: ClientModel[]
  constructor(data: Partial<QueueModel> = {}) {
    this.fill(data)
  }

  static async findByCategory(category: string) {
    return await db.queue.findFirst({
      where: {
        category,
      },
    })
  }

  static async create(category: string) {
    return await db.queue.create({
      data: { category },
    })
  }

  fill(data: Partial<QueueModel>) {
    if (data.id !== undefined) this.id = data.id
    if (data.category !== undefined) this.category = data.category
    if (data.clients !== undefined) this.clients = data.clients
  }
}
