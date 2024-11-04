import { Request, Response } from "express";
import { GetByuuidUseCase } from "../../aplication/GetByuuidUseCase";

export class GetByuuidController{
    constructor(private getByuuidUseCase: GetByuuidUseCase){}

    async run (req: Request, res: Response){
        const uuid = req.params.uuid
        try {
            if (uuid!=''){
                const auditoria = await this.getByuuidUseCase.run(uuid);
                if (auditoria){
                    res.status(200).send({
                        status: 'Encontrado',
                        data:{
                            id: auditoria.uuid,
                            tarjet: auditoria.tarjet,
                            accion: auditoria.accion,
                            creado: auditoria.fecha_creacion,
                            actulizacion: auditoria.ultima_actualizacion
                        }
                    })
                }else{
                    throw new Error ('Ocurio un error desconocido')
                }
            }else{
                throw new Error('El no se encontro id')
            }
        } catch (error) {
            res.status(400).send({
                status: 'Error',
                msn: error
            })
        }
    }
}