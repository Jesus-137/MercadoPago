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
      if (uuid!=''||data.nombre!=''||data.password!=''||data.telefono!=''||data.correo!=''){
        const cliente = await this.updateClientesUseCase.run(
          uuid,
          data.nombre,
          data.password,
          data.telefono,
          data.correo
        );

        if (typeof(cliente)=='object') {
          res.status(201).send({
            status: 'success',
            data: {
              id: cliente.uuid,
              nombre: cliente.nombre,
              password: cliente.password,
              telefono: cliente.telefono,
              correo: cliente.correo
            }
          });
        } else {
          throw (cliente);
        }
      }else{
        throw ('Campos insufisientes por favor de verificarlos')
      }
    } catch (error) {
      res.status(500).send({
        status: 'error',
        data: 'Ocurrió un error en la actualización',
        msn: error
      });
    }
  }
}
