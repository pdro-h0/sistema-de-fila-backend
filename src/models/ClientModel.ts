import { db } from "../lib/prisma";

export class ClientModel{
    static async create(data: {
        name: string;
        category: string;
        priority: string;
        contact: string;
        queueId: string
    }){
       return await db.client.create({
            data:{
                name: data.name,
                category: data.category,
                priority: data.priority,
                contact: data.contact,
                queueId: data.queueId
            }
        })
    }

    static async countByQueueId(queueId: string, status: string){
        return await db.client.count({
            where: {
                queueId,
                status
            }
        })
    }

    static async findById(id: string){
        return db.client.findUnique({where: {id}})
    }

    static async countClientsInQueue(queueId: string, status: string){
        return db.client.findMany({
            where: {
                queueId,
                status
            },
            orderBy:{
                createdAt: "asc"
            }
        })
    }
}