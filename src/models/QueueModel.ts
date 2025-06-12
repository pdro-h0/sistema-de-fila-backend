import { db } from "../lib/prisma";

export class QueueModel {
    static async findByCategory(category: string) {
        return await db.queue.findFirst({
            where: {
                category
            }
        })
    }

    static async create(category: string) {
       return await db.queue.create({
            data: { category }
        })
    }
}