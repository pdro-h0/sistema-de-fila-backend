import { RequestHandler } from "express";
import { getQueuePositionSchema, registerClientSchema } from "../schemas/clientSchema";
import { ClientService } from "../services/clientService";

export const clientController = {
    register: (async (req, res) =>{
       try {
         const data = registerClientSchema.parse(req.body)
         const {id, position} = await ClientService.register(data)
         res.status(201).json({id, position})
         return;
       } catch (error) {
        console.error(error)
        res.status(400).json({error})
       }
    })as RequestHandler,

    getQueuePosition: (async (req, res) => {
        try {
            const { id } = getQueuePositionSchema.parse(req.params);
            const { position, estimedTime } = await ClientService.getQueuePosition(id);
            res.status(200).json({ position, estimedTime });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error });
        }
    })as RequestHandler 
}