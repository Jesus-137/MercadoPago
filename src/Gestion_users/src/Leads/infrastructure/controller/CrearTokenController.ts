import { Request, Response } from "express";
import { CrearTokenUseCase } from "../../aplication/CrearTokenUseCase";

export class CrearTokenController{
    constructor(private crearTokenUseCase: CrearTokenUseCase){}

    async run (req: Request, res: Response){
        const data = req.body;
        const uuid = req.params.uuid
        try {
            if (uuid!=''||data.username!=''||data.nombre!=''||data.telefono!=''){
                const token = await this.crearTokenUseCase.run(
                    uuid,
                    data.username,
                    data.nombre,
                    data.telefono
                );
                if(token){
                    res.status(201).send({
                        status: 'Creado',
                        token: token
                    })
                }else{
                    throw ('Ocurio un error desconocido')
                }
            }else{
                throw ('Campos insuficientes por favor de verificarlos');
            }
        } catch (error) {
            res.status(400).send({
                status:'Error',
                msn: error
            })
        }
    }
}