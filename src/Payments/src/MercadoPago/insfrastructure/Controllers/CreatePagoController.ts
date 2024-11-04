import { Request, Response } from "express";
import { CreatePagoUseCase } from "../../aplication/CreatePagoUseCase";
import { User_Id } from "../../../../../ValueObjects/User_Id";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";
import { consumeMessages } from "../../../../../Rabbit/ConsumeUseCase";

export class CreatePagoController{
    constructor(readonly createPagoUseCase: CreatePagoUseCase){}
    async run (req: Request, res: Response){
        const data = req.body
        const uuid = req.params.uuid
        try {
            const user_id = new User_Id();
            const id = await user_id.get(uuid);
            console.log(id)
            if (id!=null){
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
                    });
                    produceMessage('pedir_token',`{"id": ${pago.id}}`)
                    consumeMessages('token_creado', async (msg:any)=>{
                        produceMessage('tokens', `{"id": ${pago.id}, "token": ${msg}}`)
                    })
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