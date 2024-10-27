import { Request, Response } from "express";
import { UpdateUseCase } from "../../aplication/UpdateUseCase";

export class UpdateController{
    constructor (private updateUseCase: UpdateUseCase){}

    async run (req: Request, res: Response){
        const data = req.body
        try {
            const auditoria = await this.updateUseCase.run(
                data.uuid,
                data.tarjet,
                data.accion
            );
            if (auditoria){
                res.status(200).send({
                    status: 'Actualizado',
                    data: {
                        id: auditoria.uuid,
                        tarjet: auditoria.tarjet,
                        accion: auditoria.accion,
                    }
                })
            }else{
                throw new Error('Ocurio un error desconocido')
            }
        } catch (error) {
            res.status(400).send({
                status: 'Error',
                msn: error
            })
        }
    }
}