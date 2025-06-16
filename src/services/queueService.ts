import { PriorityStrategy } from "../helpers/PrioriryStrategy"
import { ClientModel } from "../models/ClientModel"
import { HistoryModel } from "../models/HistoryModel"
import nodemailer from "nodemailer"
import { getMailClient } from "../lib/mailer"
import { AppError } from "../middlewares/errorHandler"

export class QueueService {
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

  static async callNextClient() {
    const waitingClients = await ClientModel.findClientsInQueue("Waiting")
    if (waitingClients.length === 0)
      throw new AppError(404, "No clients in queue")
    const clientsSorted = PriorityStrategy.sortClients(waitingClients)
    const nextClient = clientsSorted[0]
    await ClientModel.update(nextClient.id, "Called")
    await HistoryModel.create(nextClient.id)
    const mail = await getMailClient()
    const email = await mail.sendMail({
      from: "Fila de Espera <no-reply@fila.com>",
      to: nextClient.contact,
      subject: "Você foi chamado para atendimento!",
      html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
      <p>Olá ${nextClient.name}, chegou a sua vez de ser atendido(a) na fila de 
      <strong style="text-transform:capitalize;">${nextClient.category}</strong>.
         Por favor, <strong>dirija-se até o balcão</strong></p>
      </div>
      `.trim(),
    })
    console.log(nodemailer.getTestMessageUrl(email))
    return {
      called: {
        id: nextClient.id,
        name: nextClient.name,
        queueCategory: nextClient.category,
      },
      position: 1,
    }
  }
}
