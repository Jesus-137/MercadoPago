import { Request, Response } from "express";
import { CreateClientesUseCase } from "../../application/CreateUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";
import { Leads_Id } from "../../../../../ValueObjects/Leads_id";

export class CreateClienteController {
  constructor (
    readonly createClienteUseCase: CreateClientesUseCase,
    ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      if (data.id_lead!=''&&data.nombre!=''&&data.password!=''&&data.telefono!=''&&data.correo!=''){
        if(data.id_lead!=undefined&&data.nombre!=undefined&&data.password!=undefined&&data.telefono!=undefined&&data.correo!=undefined){
          const id_lead = await new Leads_Id().get(data.id_lead)
          if(id_lead==null){
            throw('No se encontro el contacto')
          }
          const cliente = await this.createClienteUseCase.run(
            id_lead,
            data.nombre,
            data.password
          );
          if (typeof(cliente)=='object'){
            res.status(201).send({
              status: "success",
              data: {
                id: cliente.uuid,
                nombre: cliente.nombre
              },
            });
            console.log('Registro exitoso')
            produceMessage('notificacion', `{"id": "${cliente.uuid}", "sendBy": "${data.sendBy}", "telefono": "${data.telefono}", "correo": "${data.correo}"}`)
          }
          else
            console.log(cliente)
            throw(cliente)
        }else{
          throw('Faltan campos')
        }
      }else{
        throw ('Campos insuficientes por favor de verificarlos');
      }
    } catch (error) {
      produceMessage('Error', `{"tarjet": ${data.id_lead}, "accion": ${String(error)}}`)
      res.status(400).send({
        status: "error",
        data: error,
      });
    }
  }
}
