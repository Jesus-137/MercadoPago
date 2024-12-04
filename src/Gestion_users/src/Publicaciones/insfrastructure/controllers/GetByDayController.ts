import { Request, Response } from "express";
import { GetByDayUseCase } from "../../application/GetByDayUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

export class GetByDayController{
    constructor(private getByDayUseCase: GetByDayUseCase){}

    async run (req: Request, res: Response){
        const id_cliente = req.body.id_cliente;
        try {
            console.log('holaa')
            if(!id_cliente){
                throw('No se encontro el id del cliente')
            }
            const publicacion = await this.getByDayUseCase.run(id_cliente);
            res.status(200).send({
                status: 'corecto',
                data: publicacion
            })
        } catch (error) {
            produceMessage('Error', `{"tarjet": ${id_cliente}, "accion": ${String(error)}}`)
            res.status(400).send({
                status: 'Error',
                data: error
            })
        }
    }
}