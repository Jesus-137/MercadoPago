import { Request, Response } from 'express';
import { UpdateClientesUseCase } from '../../application/UpdateUseCase';

export class UpdateController {
  constructor(
    private readonly updateClientesUseCase: UpdateClientesUseCase
  ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const uuid = req.params.uuid

    try {
      const cliente = await this.updateClientesUseCase.run(
        uuid,
        data.nombre,
        data.password,
        data.telefono
      );

      if (cliente) {
        return res.status(201).send({
          status: 'success',
          data: {
            id: cliente.uuid,
            nombre: cliente.nombre,
            password: cliente.password,
            telefono: cliente.telefono
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
