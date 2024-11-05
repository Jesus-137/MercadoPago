import { Request, Response } from "express";

import { CreateUseCase } from "../../application/CreateUseCase";

export class CreateController {
  constructor(readonly CreateUseCase: CreateUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      if (data.nombre!=''||data.tipo!=''||data.telefono!=''||data.password!=''){
        const clientes = await this.CreateUseCase.run(
          data.nombre,
          data.tipo,
          data.telefono,
          data.password
        );
        if (clientes){
          res.status(200).send(
            {
              id: clientes.uuid,
              nombre: clientes.nombre,
              tipo: clientes.tipo,
              telefono: clientes.telefono
            });
        }else{
          res.status(400).send({
            status: "error",
            msn: "Ocurrio algún problema",
          });
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
