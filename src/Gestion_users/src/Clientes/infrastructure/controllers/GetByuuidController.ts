import { Request, Response } from "express";

import { GetByuuidUseCase } from "../../application/GetuuidUseCase";

export class GetByuuidController {
  constructor(readonly getByuuidUseCase: GetByuuidUseCase) {}

  async run(req: Request, res: Response) {
    const uuid: string = String(req.params.uuid)
    try {
      if (uuid!=''){
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
      }else{
        throw new Error('No se encontro el id');
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
