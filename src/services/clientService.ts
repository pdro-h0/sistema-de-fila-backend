import { ClientModel } from "../models/ClientModel"
import { QueueModel } from "../models/QueueModel"
import type { RegisterClientInput } from "../schemas/clientSchema"
import { PriorityStrategy } from "../helpers/PrioriryStrategy"
import { HistoryModel } from "../models/HistoryModel"

export class ClientService {
  static async register(data: RegisterClientInput) {
    let queue = await QueueModel.findByCategory(data.category)
    if (!queue) {
      queue = await QueueModel.create(data.category)
    }
    const countPersonsInQueue = await ClientModel.countByQueueId(
      queue.id,
      "Waiting"
    )
    const client = await ClientModel.create({
      category: data.category,
      name: data.name,
      priority: data.priority,
      contact: data.contact,
      queueId: queue.id,
    })
    return {
      id: client.id,
      position: countPersonsInQueue + 1,
    }
  }

  static async getQueuePosition(id: string) {
    const TIME_IN_MINUTES = 5
    const client = await ClientModel.findById(id)
    if (!client) throw new Error("Client not found")
    if (client.status !== "Waiting") {
      return {
        position: 0,
        estimedTime: "Service already performed or canceled",
      }
    }
    const waitingClients = await ClientModel.findClientsInQueue(
      "Waiting",
      client.queueId!
    )
    const position = waitingClients.findIndex((c) => c.id === client.id) + 1
    const estimedTimeInMinutes = position * TIME_IN_MINUTES
    return {
      position,
      estimedTime: `${estimedTimeInMinutes} minutes`,
    }
  }

  static async cancelService(id: string) {
    const client = await ClientModel.findById(id)
    if (!client) throw new Error("Client no found")
    if (client.status !== "Waiting")
      throw new Error("Service already performed or canceled")
    await ClientModel.update(id, "Canceled")
  }

  static async listAllClientsInQueue() {
    const clients = await ClientModel.findClientsInQueue("Waiting")
    const clientsSorted = PriorityStrategy.sortClients(clients).map(
      (client, index) => ({
        id: client.id,
        name: client.name,
        position: index + 1,
        priority: client.priority,
      })
    )
    return clientsSorted
  }

  static async callNextClient() {
    const waitingClients = await ClientModel.findClientsInQueue("Waiting")
    if (waitingClients.length === 0) throw new Error("No clients in queue")
    const clientsSorted = PriorityStrategy.sortClients(waitingClients)
    const nextClient = clientsSorted[0]
    await ClientModel.update(nextClient.id, "Called")
    await HistoryModel.create(nextClient.id)
    return {
      called: {
        id: nextClient.id,
        name: nextClient.name,
      },
      position: 1,
    }
  }

  static async getMetrics() {
    const MILISECONDS_IN_MINUTE = 60000
    const calledClients = await ClientModel.findClientsAlreadyCalled()
    const canceledClients = await ClientModel.findClientsInQueue("Canceled")
    const totalAttended = calledClients.length
    const totalCanceled = canceledClients.length
    if (totalAttended === 0 && totalCanceled === 0) {
      return {
        averageWaitTime: "0 minutes",
        totalAttended: 0,
        categories: {},
      }
    }
    const totalMinutes = calledClients.reduce((sum, client) => {
      const start = client.createdAt.getTime()
      const called = client.histories?.[0]?.calledAt.getTime()
      if (!called) return sum
      const diff = (called - start) / MILISECONDS_IN_MINUTE
      return sum + diff
    }, 0)
    const avg = Math.round(totalMinutes / totalAttended) || 0
    const categoriesCount: Record<string, number> = {}
    calledClients.forEach((client) => {
      if (!categoriesCount[client.category]) {
        categoriesCount[client.category] = 0
      }
      categoriesCount[client.category]++
    })
    return {
      averageWaitTime: `${avg} minutes`,
      totalAttended,
      totalCanceled,
      categories: categoriesCount,
    }
  }
}
