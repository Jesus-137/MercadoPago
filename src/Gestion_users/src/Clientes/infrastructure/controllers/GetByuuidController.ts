import { Request, Response } from "express";

import { GetByuuidUseCase } from "../../application/GetuuidUseCase";

export class GetByuuidController {
  constructor(readonly getByuuidUseCase: GetByuuidUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const uuid: string = String(req.params.uuid)
      const clientes = await this.getByuuidUseCase.run(uuid);
      if (clientes)
        res.status(200).send(
          {
            id: clientes.uuid,
            nombre: clientes.nombre,
            telefono: clientes.telefono,
            tipo: clientes.tipo
          }
        );
      else
        res.status(400).send({
          status: "error",
          msn: "Ocurrio algún problema",
        });
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
