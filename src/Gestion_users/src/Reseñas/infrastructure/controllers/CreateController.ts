import { Request, Response } from "express";
import { CreateUseCase } from "../../application/CreateUseCase";
import { Publicaciones_Id } from "../../../../../ValueObjects/Publicaciones_id";

export class CreateClienteController {
  constructor (
    readonly createUseCase: CreateUseCase,
    ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const estrellas =  parseInt(data.estrellas);
      console.log(!data.id_usuario)
      if (data.id_usuario&&data.id_publicacion&&data.comentario&&!isNaN(estrellas)){
        const id_publicacion = await new Publicaciones_Id().get(data.id_publicacion);
        console.log(id_publicacion)
        if(typeof(id_publicacion)!='number'){
          throw('No se encontro la publicacion');
        }else if(id_publicacion){
          const cliente = await this.createUseCase.run(
            data.id_usuario,
            id_publicacion,
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
