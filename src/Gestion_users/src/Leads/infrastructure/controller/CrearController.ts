import { Request, Response } from "express";
import { CrearUseCase } from "../../aplication/CrearUseCase";

export class CrearController{
    constructor(private crearUseCase: CrearUseCase){}
    
    async run (req: Request, res: Response){
        const data = req.body;
        try {
            if (data.username!=''||data.nombre!=''||data.telefono!=''){
                const leads = await this.crearUseCase.run(
                    data.username,
                    data.nombre,
                    data.telefono
                );
                if(leads){
                    res.status(201).send({
                        status: 'Creado',
                        data:{
                            id: leads.uuid,
                            user_name: leads.username,
                            nombre: leads.nombre,
                            telefono: leads.telefono
                        }
                    })
                }else{
                    throw ('Ocurio un error desconocido');
                }
            }else{
                throw ('Campos insuficientes por favor de verificarlos');
            }
        } catch (error) {
            res.status(400).send({
                status: 'Error',
                msn: error
            });
        }
    }
}