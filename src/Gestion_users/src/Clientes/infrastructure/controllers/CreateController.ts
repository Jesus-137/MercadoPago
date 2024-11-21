import { Request, Response } from "express";

import { CreateUseCase } from "../../application/CreateUseCase";

export class CreateController {
  constructor(readonly CreateUseCase: CreateUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      if (data.id_lead!=''||data.tipo!=''||data.generos!=''||data.password!=''||data.ubicacion!=''||data.tipo_evento!=''){
        const clientes = await this.CreateUseCase.run(
          data.id_lead,
          data.tipo,
          data.password,
          data.generos,
          data.ubicacion,
          data.tipo_evento
        );
        if (typeof(clientes)=='object'){
          res.status(200).send({
              id: clientes.uuid,
              tipo: clientes.tipo,
              tipo_evento: clientes.tipo_evento,
              generos: clientes.genero_musical,
              ubicacion: clientes.ubicacion
            });
        }else{
          throw(clientes)
        }
      }else{
        throw ('Campos insuficientes por farvor de verificarlos')
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
