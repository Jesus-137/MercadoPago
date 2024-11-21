import { Request, Response } from "express";
import { UpdateUseCase } from "../../aplication/UpdateUseCase";

export class UpdateController{
    constructor(private updateUseCase: UpdateUseCase){}

    async run (req: Request, res:Response){
        const uuid = req.params.uuid;
        try {
            const token = await this.updateUseCase.run(
                0,
                uuid
            );
            if(token){
                res.status(200).send({
                    status: 'Actualizado',
                    msn: token
                });
            }else{
                throw('Ocurio un error desconocido');
            }
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msn: error
            });
        }
    }
}