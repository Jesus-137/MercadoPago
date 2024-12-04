import { Request, Response } from "express";
import { CreateUseCase } from "../../application/CreateUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

export class CreateController {
  constructor (
    readonly createClienteUseCase: CreateUseCase,
    ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      console.log(req.body)
      const id_cliente = parseInt(data.id_cliente)
      if (data.titulo&&data.descripcion&&data.contenido&&!isNaN(id_cliente)){
        const cliente = await this.createClienteUseCase.run(
          data.titulo,
          data.descripcion,
          data.contenido,
          id_cliente
        );
        if (typeof(cliente)=='object'){
          res.status(201).send({
            status: "success",
            data: {
              id: cliente.uuid,
              titulo: cliente.titulo,
              descripcion: cliente.descripcion,
              contenido: cliente.contenido
            },
          });
          console.log('Registro exitoso')
        }
        else
          throw (cliente);
      }else{
        throw ('Campos insuficiente por favor de verificarlos');
      }
    } catch (error) {
      produceMessage('Error', `{"tarjet": ${data.id_cliente}, "accion": ${String(error)}}`)
      res.status(400).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
