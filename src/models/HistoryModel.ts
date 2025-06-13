import { db } from "../lib/prisma"

export class HistoryModel {
  static async create(clientId: string) {
    return await db.history.create({
      data: {
        clientId,
      },
    })
  }
}
