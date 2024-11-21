import { Request, Response } from "express";
import { CreateClientesUseCase } from "../../application/CreateUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

export class CreateClienteController {
  constructor (
    readonly createClienteUseCase: CreateClientesUseCase,
    ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      if (data.nombre!=''||data.password!=''||data.telefono!=''||data.correo!=''){
        const cliente = await this.createClienteUseCase.run(
          data.nombre,
          data.password,
          data.telefono,
          data.correo
        );
        if (typeof(cliente)=='object'){
          //Code HTTP : 201 -> Creado
          res.status(201).send({
            status: "success",
            data: {
              id: cliente.uuid,
              nombre: cliente.nombre,
              telefono: cliente.telefono,
              correo: cliente.correo
            },
          });
          console.log('Registro exitoso')
          produceMessage('notificacion', `{"id": "${cliente.uuid}", "sendBy": "${data.sendBy}", "telefono": "${cliente.telefono}", "correo": "${cliente.correo}"}`)
        }
        else
          throw(cliente)
      }else{
        throw ('Campos insuficientes por favor de verificarlos');
      }
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
