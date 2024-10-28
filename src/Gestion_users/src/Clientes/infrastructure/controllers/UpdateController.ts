import { Request, Response } from "express";

import { UpdateUseCase } from "../../application/UpdateUseCase";

export class UpdateController {
  constructor(readonly UpdateUseCase: UpdateUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const uuid = req.params.uuid
    try {
      if (uuid!=''||data.nombre!=''||data.tipo!=''||data.password!=''||data.telefono!=''){
        const clientes = await this.UpdateUseCase.run(
          uuid,
          data.nombre,
          data.tipo,
          data.password,
          data.telefono
        );
        if (clientes)
          res.status(200).send(
            {
              id: clientes.uuid,
              nombre: clientes.nombre,
              tipo: clientes.tipo,
              telefono: clientes.telefono
            });
        else
          res.status(400).send({
            status: "error",
            msn: "Ocurrio algún problema",
          });
      }else{
        throw new Error('Campos insuficientes por farvor de verificarlos');
      }
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
