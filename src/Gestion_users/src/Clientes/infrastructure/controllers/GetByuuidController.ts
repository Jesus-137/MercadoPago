import { Request, Response } from "express";

import { GetByuuidUseCase } from "../../application/GetuuidUseCase";

export class GetByuuidController {
  constructor(readonly getByuuidUseCase: GetByuuidUseCase) {}

  async run(req: Request, res: Response) {
    const uuid: string = String(req.params.uuid)
    try {
      if (uuid!=''){
        const clientes = await this.getByuuidUseCase.run(uuid);
        if (typeof(clientes)=='object'){
          res.status(200).send({
              status: "encontrado",
              data:{
                id: clientes.uuid,
                id_lead: clientes.id_lead,
                foto_perfil: clientes.foto_perfil,
                tipo: clientes.tipo,
                tipo_evento: clientes.tipo_evento,
                ubicacion: clientes.ubicacion,
                generos: clientes.genero_musical
              }
            }
          );
        }
        else
          throw(clientes)
      }else{
        throw ('No se encontro el usuario verificar el id');
      }
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(400).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
