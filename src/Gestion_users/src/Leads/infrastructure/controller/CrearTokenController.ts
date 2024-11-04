import { Request, Response } from "express";
import { CrearTokenUseCase } from "../../aplication/CrearTokenUseCase";
import { consumeMessages } from "../../../../../Rabbit/ConsumeUseCase";
import { CrearTokenByidUseCase } from "../../aplication/CrearTokenByidUseCase";
import { MySqlRepo } from "../adaptadores/MySqlRepo";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

export class CrearTokenController{
    constructor(private crearTokenUseCase: CrearTokenUseCase){
        consumeMessages('pedir_token', async (msg: any)=>{
            const token = JSON.parse(JSON.stringify(msg)).id
            const crearTokenByidUseCase = new CrearTokenByidUseCase(new MySqlRepo);
            const newToken = await crearTokenByidUseCase.run(token)
            if (newToken){
                produceMessage('token_creado', newToken)
            }else{
                produceMessage('token_creado', 'Error al crear token')
            }
        });
    }

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
                    throw new Error('Ocurio un error desconocido')
                }
            }else{
                throw new Error('Campos insuficientes por favor de verificarlos');
            }
        } catch (error) {
            res.status(400).send({
                status:'Error',
                msn: error
            })
        }
    }
}