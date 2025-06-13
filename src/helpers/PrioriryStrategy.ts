const priorityOrder = {
  Urgent: 1,
  High: 2,
  Normal: 3,
} as const
export class PriorityStrategy {
  static sortClients<
    T extends {
      queueId: string | null
      status: string
      id: string
      category: string
      name: string
      priority: string
      contact: string
      createdAt: Date
    },
  >(clients: T[]): T[] {
    return clients.sort((a, b) => {
      const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder]
      const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder]
      return (
        priorityA - priorityB || a.createdAt.getTime() - b.createdAt.getTime()
      )
    })
  }
}
