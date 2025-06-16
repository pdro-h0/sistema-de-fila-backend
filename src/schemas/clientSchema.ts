import { z } from "zod"

export const registerClientSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  category: z.string().min(1, "Campo obrigatório"),
  priority: z.enum(["Normal", "High", "Urgent"]),
  contact: z.string().email("Email inválido"),
})
export type RegisterClientInput = z.infer<typeof registerClientSchema>

export const getQueuePositionSchema = z.object({
  id: z.string().uuid("Id inválido"),
})
export type GetQueuePositionInput = z.infer<typeof getQueuePositionSchema>

export const listAllInQueueSchema = z.object({
  queueCategory: z.string(),
})
export type ListAllInQueueInput = z.infer<typeof listAllInQueueSchema>

export const cancelServiceSchema = z.object({
  id: z.string().uuid("Id inválido"),
})
export type CancelServiceInput = z.infer<typeof cancelServiceSchema>
