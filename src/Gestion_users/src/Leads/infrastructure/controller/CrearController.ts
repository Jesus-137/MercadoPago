import { Request, Response } from "express";
import { CrearUseCase } from "../../aplication/CrearUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

export class CrearController{
    constructor(private crearUseCase: CrearUseCase){}
    
    async run (req: Request, res: Response){
        const data = req.body;
        try {
            if (data.sendBy=='correo'||data.sendBy=='whatsapp'){
                if (data.username!=''||data.nombre!=''||data.telefono!=''){
                    const leads = await this.crearUseCase.run(
                        data.username,
                        data.nombre,
                        data.telefono,
                        data.correo
                    );
                    if(leads){
                        res.status(201).send({
                            status: 'Creado',
                            data:{
                                id: leads.uuid,
                                user_name: leads.username,
                                nombre: leads.nombre,
                                telefono: leads.telefono,
                                correo: leads.correo
                            }
                        });
                        produceMessage(data.sendBy, `{"id": ${leads.uuid}, "telefono": ${leads.telefono}, "correo": ${leads.correo}}`)
                    }else{
                        throw ('Ocurio un error desconocido');
                    }
                }else{
                    throw ('Campos insuficientes por favor de verificarlos');
                }
            }else{
                throw ('No se especifico por donde mandar la notificación')
            }
        } catch (error) {
            res.status(400).send({
                status: 'Error',
                msn: error
            });
        }
    }
}