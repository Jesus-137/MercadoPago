import { Request, Response } from 'express';
import { UpdateUseCase } from '../../application/UpdateUseCase';

export class UpdateController {
  constructor(
    private readonly updateClientesUseCase: UpdateUseCase
  ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const uuid = req.params.uuid_resenas

    try {
      const id_usuario = parseInt(data.id_usuario);
      const id_publicacion = parseInt(data.id_publicacion);
      const estrellas = parseInt(data.estrellas)
      if (uuid!=''||!isNaN(id_usuario)||!isNaN(id_publicacion)||data.comentario!=''||!isNaN(estrellas)){
        const cliente = await this.updateClientesUseCase.run(
          uuid,
          id_usuario,
          id_publicacion,
          data.comentario,
          estrellas
        );

        if (cliente) {
          return res.status(201).send({
            status: 'success',
            data: {
              id: cliente.uuid,
              comentario: cliente.comentario,
              estrellas: cliente.estrellas,
            }
          });
        } else {
          return res.status(204).send({
            status: 'error',
            data: 'No fue posible actualizar el registro'
          });
        }
      }else{
        throw ('Campos insuficientes por favor de verificarlos');
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
