import { Request, Response } from "express";
import { MandarMensajeUseCase } from "../../aplication/MandarMensajeUseCase";

export class MandarMensajeController{
    constructor(private mandarMensajeUseCase: MandarMensajeUseCase){}

    async run (req: Request, res: Response){
        const data = req.body
        try {
            const whatsapp = await this.mandarMensajeUseCase.run(data.telefono);
            if(whatsapp){
                res.status(201).send({
                    status: 'creado',
                    data: {
                        code: whatsapp.code
                    }
                })
            }else{
                res.status(400).send({
                    status: "Error",
                    msn: "Ocurio un error desconocido"
                })
            }
        } catch (error) {
            res.status(400).send({
                status: "Error",
                msn: error
            })
        }
    }
}