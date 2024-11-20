import { Request, Response } from "express";
import { CrearUseCase } from "../../aplication/CrearUseCase";

export class CrearController{
    constructor (private crearUseCase: CrearUseCase){}
    
    async run (req: Request, res: Response){
        const data = req.body
        try {
            if(data.tarjet != '' || data.accion != ''){
                const auditoria = await this.crearUseCase.run(
                    data.tarjet,
                    data.accion
                );
                if (auditoria){
                    res.status(201).send({
                        status: 'Creado',
                        data: {
                            id: auditoria.uuid,
                            tarjet: auditoria.tarjet,
                            accion: auditoria.accion,
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
            res.status(400).send({
                status: 'Error',
                msn: error
            })
        }
    }
}