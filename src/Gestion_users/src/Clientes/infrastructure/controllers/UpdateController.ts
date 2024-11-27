import { Request, Response } from "express";

import { UpdateUseCase } from "../../application/UpdateUseCase";

export class UpdateController {
  constructor(readonly UpdateUseCase: UpdateUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const uuid = req.params.uuid
    try {
      if (uuid&&data.generos&&data.tipo&&data.tipo_evento&&data.ubicacion&&data.nombre&&data.password){
        const clientes = await this.UpdateUseCase.run(
          data.nombre,
          data.password,
          uuid,
          data.tipo,
          data.generos,
          data.tipo_evento,
          data.ubicacion
        );

        if (clientes=='Se actualizo correctamente')
          res.status(200).send({
              status: 'actualizado',
              data: clientes
            });
        else
          throw(clientes)
      }else{
        throw ('Campos insuficientes por farvor de verificarlos');
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
