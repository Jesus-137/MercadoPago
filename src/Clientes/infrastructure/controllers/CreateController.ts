import { Request, Response } from "express";

import { CreateUseCase } from "../../application/CreateUseCase";

export class CreateController {
  constructor(readonly CreateUseCase: CreateUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const clientes = await this.CreateUseCase.run(
        data.nombre,
        data.password,
        data.tipo,
        data.phone
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
