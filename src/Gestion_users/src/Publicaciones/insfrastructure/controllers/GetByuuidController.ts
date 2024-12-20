import { Request, Response } from "express";

import { GetByuuidUseCase } from "../../application/GetByuuidUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

export class GetByuuidController {
  constructor(readonly getByIdClienteUseCase: GetByuuidUseCase) {}

  async run(req: Request, res: Response) {
    const uuid: string = String(req.params.uuid);
    try {
      if(uuid!=''){
        const cliente = await this.getByIdClienteUseCase.run(uuid);
        if (typeof(cliente)=='object')
          res.status(200).send({
            status: "success",
            data: {
              id: cliente.uuid,
              titulo: cliente.titulo,
              descripcion: cliente.descripcion,
              contenido: cliente.contenido
            },
          });
        else
          throw(cliente)
      }else{
        throw ('Campos insuficientes por favor de verificarlos');
      }
    } catch (error) {
      produceMessage('Error', `{"tarjet": ${uuid}, "accion": ${String(error)}}`)
      //Code HTTP : 204 Sin contenido
      res.status(400).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
