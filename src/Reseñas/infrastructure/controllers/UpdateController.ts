import { Request, Response } from 'express';
import { UpdateUseCase } from '../../application/UpdateUseCase';

export class UpdateController {
  constructor(
    private readonly updateClientesUseCase: UpdateUseCase
  ) {}

  async run(req: Request, res: Response) {
    const data = req.body;

    try {
      const cliente = await this.updateClientesUseCase.run(
        data.uuid,
        data.id_usuario,
        data.id_publicacion,
        data.comentario,
        data.estrellas
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
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        data: 'Ocurrió un error en la actualización',
        msn: error
      });
    }
  }
}
