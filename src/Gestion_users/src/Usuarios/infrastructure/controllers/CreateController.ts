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
      if (data.nombre!=''||data.password!=''||data.telefono!=''){
        const cliente = await this.createClienteUseCase.run(
          data.nombre,
          data.password,
          data.telefono
        );
        if (cliente){
          //Code HTTP : 201 -> Creado
          res.status(201).send({
            status: "success",
            data: {
              id: cliente.uuid,
              nombre: cliente.nombre,
              telefono: cliente.telefono,
            },
          });
          console.log('Registro exitoso')
          produceMessage('crear_usuario' ,cliente.telefono)
        }
        else
          res.status(204).send({
            status: "error",
            data: "NO fue posible agregar el registro",
          });
      }else{
        throw new Error('Campos insuficientes por favor de verificarlos');
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
