import { ClientModel } from "../models/ClientModel";
import { QueueModel } from "../models/QueueModel";
import { RegisterClientInput } from "../schemas/clientSchema";

export class ClientService{
    static async register(data:RegisterClientInput){
        let queue = await QueueModel.findByCategory(data.category)
        if(!queue){
            queue = await QueueModel.create(data.category)
        }
        const countPersonsInQueue = await ClientModel.countByQueueId(queue.id, 'Waiting')
        const client = await ClientModel.create({
            category: data.category,
            name: data.name,
            priority: data.priority,
            contact: data.contact,
            queueId: queue.id
        })
        return {
            id: client.id,
            position: countPersonsInQueue + 1
        }
    }

    static async getQueuePosition(id: string){
        const TIME_IN_MINUTES = 5;
        const client = await ClientModel.findById(id);
        if(!client) throw new Error("Client not found");
        if(client.status !=="Waiting"){
            return {
                position: 0,
                estimedTime: "Service already performed or canceled"
            }
        }
        const waitingClients = await ClientModel.countClientsInQueue(client.queueId!, "Waiting")
        const position = waitingClients.findIndex(c => c.id === client.id) + 1;
        const estimedTimeInMinutes = position * TIME_IN_MINUTES;
        return {
            position,
            estimedTime: `${estimedTimeInMinutes} minutes`
        }
    }
}