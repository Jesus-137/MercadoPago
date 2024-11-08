import { Request, Response } from "express";
import { CreatePagoUseCase } from "../../aplication/CreatePagoUseCase";
import { Clientes_Id } from "../../../../../ValueObjects/Cliente_id";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";
import { consumeMessages } from "../../../../../Rabbit/ConsumeUseCase";

export class CreatePagoController{
    constructor(readonly createPagoUseCase: CreatePagoUseCase){}
    async run (req: Request, res: Response){
        const data = req.body
        const uuid = req.params.uuid
        try {
            const user_id = new Clientes_Id();
            const id = await user_id.get(uuid);
            console.log(id)
            if (id!=null){
                let token='';
                produceMessage('pedir_token',`{"id": ${uuid}}`)
                consumeMessages('token_creado', async (msg:any)=>{
                    token = String(msg);
                    produceMessage('tokens', `{"id": ${id}, "token": ${msg}}`)
                })
                const pago = await this.createPagoUseCase.run(
                    uuid,
                    token,
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
                    });
                }
            }else{
                throw ('El id no es valido')
            }
        } catch (error) {
            res.status(400).send({
                status: 'Error',
                mensaje: error
            })
        }
    }
}