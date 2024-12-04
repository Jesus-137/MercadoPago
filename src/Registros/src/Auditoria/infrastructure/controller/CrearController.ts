import { Request, Response } from "express";
import { CrearUseCase } from "../../aplication/CrearUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";
import { consumeMessages } from "../../../../../Rabbit/ConsumeUseCase";

export class CrearController{
    constructor (private crearUseCase: CrearUseCase){
        consumeMessages('Error', (msn:string)=>{
            const data = JSON.parse(msn)
            crearUseCase.run(data.tarjet, data.accion, 'Error')
        })
    }
    
    async run (req: Request, res: Response){
        const data = req.body
        try {
            if(data.tarjet&&data.accion&&data.tipo){
                const auditoria = await this.crearUseCase.run(
                    data.tarjet,
                    data.accion,
                    data.tipo
                );
                if (auditoria){
                    res.status(201).send({
                        status: 'Creado',
                        data: {
                            id: auditoria.uuid,
                            tarjet: auditoria.tarjet,
                            accion: auditoria.accion,
                            tipo: auditoria.tipo,
                            creacion: auditoria.fecha_creacion
                        }
                    })
                }else{
                    throw ('Ocurio un error desconocido')
                }
            }else{
                throw ('Campos insuficientes por farvor de verificarlos')
            }
        } catch (error) {
            produceMessage('Error', `{"tarjet": "registro", "accion": ${String(error)}}`)
            res.status(400).send({
                status: 'Error',
                msn: error
            })
        }
    }
}