import { Request, Response } from 'express';
import { UpdateUseCase } from '../../application/UpdateUseCase';
import { User_Id } from '../../../../../ValueObjects/User_Id';
import { Publicaciones_Id } from '../../../../../ValueObjects/Publicaciones_id';

export class UpdateController {
  constructor(
    private readonly updateClientesUseCase: UpdateUseCase
  ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const uuid = req.params.uuid_resenas

    try {
      const estrellas = parseInt(data.estrellas)
      if (uuid!=''&&!data.id_usuario&&!data.id_publicacion&&data.comentario!=''&&!isNaN(estrellas)){
        const id_usuario = await new User_Id().get(data.id_usuario);
        const id_publicacion = await new Publicaciones_Id().get(data.id_publicacion);
        if(id_usuario&&id_publicacion){
          const cliente = await this.updateClientesUseCase.run(
            uuid,
            id_usuario,
            id_publicacion,
            data.comentario,
            estrellas
          );
  
          if (typeof(cliente)=='object') {
            return res.status(201).send({
              status: 'success',
              data: {
                id: cliente.uuid,
                comentario: cliente.comentario,
                estrellas: cliente.estrellas,
              }
            });
          } else {
            throw(cliente)
          }
          }else{
            throw ('Campos insuficientes por favor de verificarlos');
          }
        }else{
          throw('No se encontro la publicacion o el usuario')
        }
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        data: 'Ocurrió un error en la actualización',
        msn: error
      });
    }
  }
}
