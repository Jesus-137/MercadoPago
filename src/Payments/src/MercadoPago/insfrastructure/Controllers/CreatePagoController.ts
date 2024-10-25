import { Request, Response } from "express";
import { CreatePagoUseCase } from "../../aplication/CreatePagoUseCase";

export class CreatePagoController{
    constructor(readonly createPagoUseCase: CreatePagoUseCase){}
    async run (req: Request, res: Response){
        const data = req.body
        try {
            const pago = await this.createPagoUseCase.run(
                data.transaction_amount,
                data.back_url
            );
            if(pago){
                res.status(201).send({
                    status: 'creado',
                    data: {
                        id: pago.id,
                        url: pago.url
                    },
                    mensaje: 'Se creo la url del pago'
                })
            }
        } catch (error) {
            res.status(400).send({
                status: 'Error',
                mensaje: error
            })
        }
    }
}