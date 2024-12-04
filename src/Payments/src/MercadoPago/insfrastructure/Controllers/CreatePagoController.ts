import { Request, Response } from "express";
import { CreatePagoUseCase } from "../../aplication/CreatePagoUseCase";
import { Clientes_Id } from "../../../../../ValueObjects/Cliente_id";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

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
                const pago = await this.createPagoUseCase.run(
                    uuid,
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
                    if(data.telefono==""){
                        produceMessage('notificacion', `{"sendBy": "correo", "correo": "${data.correo}", "id": "${uuid}", "msg": "Ha solicitado un pago a nuestro servicio de kenstudios. Si no es el caso, favor de reportarlo respondiendo a este correo"}`)
                    }else{
                        produceMessage("notificacion", `{"sendBy": "whatsapp", "telefono": "${data.telefono}", "id": "${uuid}"}`)
                    }
                }else{
                    throw ('Ocurio un error desconocido')
                }
            }else{
                throw ('El id no es valido')
            }
        } catch (error) {
            produceMessage('Error', `{"tarjet": ${uuid}, "accion": ${String(error)}}`)
            res.status(400).send({
                status: 'Error',
                mensaje: error
            })
        }
    }
}