import { Request, Response } from "express";
import { GetAllUseCase } from "../../aplication/GetAllUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

export class GetAllController{
    constructor(private getAllUseCase: GetAllUseCase){}

    async run (req: Request, res: Response){
        console.log(req.headers)
        try {
            const tokens = await this.getAllUseCase.run();
            if(tokens){
                res.status(200).send({
                    data: tokens.map((token: any)=>({
                        id: token.uuid,
                        token: token.token,
                        habilitado: token.habilitado,
                        creacion: token.creacion,
                        actualizacion: token.actualizacion
                    }))
                })
            }else{
                throw('Ocurio un error inesperado')
            }
        } catch (error) {
            produceMessage('Error', `{"tarjet": "admin", "accion": ${String(error)}}`)
            res.status(400).send({
                status:'error',
                msn: error
            })
        }
    }
}