import 'dotenv/config'
import { db } from './src/lib/prisma'

beforeEach(async () => {
  await db.history.deleteMany()
  await db.client.deleteMany()
  await db.queue.deleteMany()
})

afterAll(async () => {
  await db.$disconnect()
})
