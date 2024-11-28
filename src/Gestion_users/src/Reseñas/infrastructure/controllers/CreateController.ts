import { Request, Response } from "express";
import { CreateUseCase } from "../../application/CreateUseCase";
import { Clientes_Id } from "../../../../../ValueObjects/Cliente_id";

export class CreateClienteController {
  constructor (
    readonly createUseCase: CreateUseCase,
    ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const estrellas =  parseInt(data.estrellas);
      if (data.id_usuario&&data.id_cliente&&data.comentario&&!isNaN(estrellas)){
        const id_cliente = await new Clientes_Id().get(data.id_cliente);
        if(id_cliente){
          const cliente = await this.createUseCase.run(
            data.id_usuario,
            id_cliente,
            data.comentario,
            estrellas
          );
          if (typeof(cliente)=='object'){
            res.status(201).send({
              status: "success",
              data: {
                id: cliente.uuid,
                comentario: cliente.comentario,
                estrellas: cliente.estrellas
              },
            });
            console.log('Registro exitoso')
          }
          else
            throw (cliente)
        }else{
          throw('Cliente no encontrado')
        }
      }else{
        throw ('Campos insuficientes por favor de verificarlos');
      }
    } catch (error) {
      res.status(400).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
