import { Request, Response } from "express";
import { CreateUseCase } from "../../application/CreateUseCase";

export class CreateClienteController {
  constructor (
    readonly createUseCase: CreateUseCase,
    ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const id_usuario = parseInt(data.id_usuario);
      const id_publicacion = parseInt(data.id_publicacion);
      const estrellas =  parseInt(data.estrellas);
      if (!isNaN(id_usuario)||!isNaN(id_publicacion)||data.comentario!=''||!isNaN(estrellas)){
        const cliente = await this.createUseCase.run(
          id_usuario,
          id_publicacion,
          data.comentario,
          estrellas
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
          throw ("NO fue posible agregar el registro")
      }else{
        throw ('Campos insuficientes por favor de verificarlos');
      }
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
