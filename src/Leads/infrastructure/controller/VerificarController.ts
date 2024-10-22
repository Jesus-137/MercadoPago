import { Request, Response } from "express";
import { VerificarUseCase } from "../../aplication/VerificarUseCase";
import jwt from 'jsonwebtoken'

export class VerificarController{
    constructor(private verificarUseCase: VerificarUseCase){}

    async run (req: Request, res: Response){
        const data = req.body
        const secretKey = 'VerificarUsuario'
        try {
            try {
                const decoded = jwt.verify(data.token, secretKey);
                console.log(decoded);
                try {
                    const resultado = await this.verificarUseCase.run(
                        data.data,
                        data.tipo
                    )
                    if(resultado){
                        res.status(200).send({
                            status: 'Verificado',
                            data: resultado
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
            } catch (err) {
                res.status(400).send({
                    status: 'Error',
                    msn: 'Token no valido'
                })
            }
        } catch (error) {
            
        }
    }
}