import { db } from "../lib/prisma"

export class HistoryModel {
  id: string
  calledAt: Date
  clientId: string
  constructor(data: Partial<HistoryModel> = {}) {
    this.fill(data)
  }

  static async create(clientId: string) {
    return await db.history.create({
      data: {
        clientId,
      },
    })
  }

  fill(data: Partial<HistoryModel>) {
    if (data.id !== undefined) this.id = data.id
    if (data.calledAt !== undefined) this.calledAt = data.calledAt
    if (data.clientId !== undefined) this.clientId = data.clientId
  }
}
