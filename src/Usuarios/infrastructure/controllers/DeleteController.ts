import { Request, Response } from "express";

import { DeleteUseCase } from "../../application/DeleteUseCase";

export class DeleteController {
  constructor(readonly DeleteUseCase: DeleteUseCase) {}

  async run(req: Request, res: Response) {
    const uuid: string = String(req.params.uuid);
    try {
      const cliente = await this.DeleteUseCase.run(uuid);

      if (cliente != '0')
        //Code HTTP : 200 -> Consulta exitosa
        res.status(200).send({
          status: "success",
          data: 'Se elmino correctamente',
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
