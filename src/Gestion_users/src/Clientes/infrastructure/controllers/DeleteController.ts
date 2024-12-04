import { Request, Response } from "express";

import { DeleteUseCase } from "../../application/DeleteUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

export class DeleteController {
  constructor(readonly DeleteUseCase: DeleteUseCase) {}

  async run(req: Request, res: Response) {
    const uuid: string = String(req.params.uuid);
    try {
      if(uuid!=''){
        const cliente = await this.DeleteUseCase.run(uuid);

        if (cliente=='Se elimino corectamente')
          //Code HTTP : 200 -> Consulta exitosa
          res.status(200).send({
            status: "success",
            data: cliente,
          });
        else
          throw(cliente)
      }else{
        throw ('No se encontro el usuario verificar el id')
      }
    } catch (error) {
      produceMessage('Error', `{"tarjet": ${uuid}, "accion": ${String(error)}}`)
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
