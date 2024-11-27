import { Request, Response } from "express";

import { GetAllUseCase } from "../../application/GetAllUseCase";

export class GetAllClientesController {
  constructor(readonly getAllProductUseCase: GetAllUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const id_cliente = req.body.id_cliente
      if(!id_cliente){
        console.log(req.body)
        throw('Falta el id')
      }
      const clientes = await this.getAllProductUseCase.run(parseInt(id_cliente));
      if (typeof(clientes)!='string')
        res.status(200).send(clientes.map((cliente: any) => {
            return {
              id: cliente.uuid,
              desripcion: cliente.descripcion,
              contenido: cliente.contenido
            };
          }),
        );
      else
        throw (clientes)
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