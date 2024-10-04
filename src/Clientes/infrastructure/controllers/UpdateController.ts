import { Request, Response } from "express";

import { UpdateUseCase } from "../../application/UpdateUseCase";

export class UpdateController {
  constructor(readonly UpdateUseCase: UpdateUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const clientes = await this.UpdateUseCase.run(
        data.uuid,
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
