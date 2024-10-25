import { Request, Response } from "express";
import { CreateUseCase } from "../../application/CreateUseCase";

export class CreateClienteController {
  constructor (
    readonly createUseCase: CreateUseCase,
    ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const cliente = await this.createUseCase.run(
        data.id_usuario,
        data.id_publicacion,
        data.comentario,
        data.estrellas
      );
      if (cliente){
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
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
