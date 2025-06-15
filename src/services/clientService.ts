import { ClientModel } from "../models/ClientModel"
import { QueueModel } from "../models/QueueModel"
import type { RegisterClientInput } from "../schemas/clientSchema"
import { PriorityStrategy } from "../helpers/PrioriryStrategy"
import nodemailer from "nodemailer"
import { getMailClient } from "../lib/mailer"

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
    const mail = await getMailClient()
    const message = await mail.sendMail({
      from: "Fila de Espera <no-reply@fila.com>",
      to: client.contact,
      subject: "Cliente registrado com sucesso!",
      html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
      <p>Olá ${client.name}, você está na fila para <strong>${client.category}</strong>. 
      Você está na <strong>${countPersonsInQueue + 1}</strong>° posição.
      </p>
      </div>`.trim(),
    })
    console.log(nodemailer.getTestMessageUrl(message))
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
    const mail = await getMailClient()
    const email = await mail.sendMail({
      from: "Fila de Espera <no-reply@fila.com>",
      to: client.contact,
      subject: "Você saiu da fila!",
      html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
      <p>Olá ${client.name}, sua inscrição na fila de <strong>${client.category}</strong> foi <strong>cancelada</strong> com sucesso.</p>
      </div>
      `.trim(),
    })
    console.log(nodemailer.getTestMessageUrl(email))
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
}
