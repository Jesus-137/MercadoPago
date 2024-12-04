import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { CrearUseCase } from "../../aplication/CrearUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

export class CrearController{
    constructor(private crearUseCase: CrearUseCase){}

    async run (req: Request, res: Response){
        const data = req.body
        try {
            const secretKey = 'Cre4rT0kenF0rP4g0p4y';
            const playload = {
                uuid: data.uuid,
                nombre: data.nombre
            }
            const newToken = await jwt.sign(playload, secretKey, {expiresIn: '1h'});
            const token = await this.crearUseCase.run(
                newToken,
                1
            );
            if(token){
                res.status(200).send({
                    status: 'creado',
                    token: newToken
                });
            }else{
                throw('Ocurio un error desconocido');
            }
        } catch (error) {
            produceMessage('Error', `{"tarjet": ${data.uuid}, "accion": ${String(error)}}`)
            res.status(400).send({
                status: 'error',
                msn: error
            })
        }
    }
}