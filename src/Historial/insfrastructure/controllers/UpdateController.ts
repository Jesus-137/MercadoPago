import { Request, Response } from "express";
import { UpdateUseCase } from "../../application/UpdateUseCase";

export class UpdateController {
  constructor (
    readonly UpdateClienteUseCase: UpdateUseCase,
    ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const uuid = req.params.uuid_historial
    try {
      const cliente = await this.UpdateClienteUseCase.run(
        uuid,
        data.id_usuario,
        data.busqueda
      );
      if (cliente){
        //Code HTTP : 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            uuid: cliente.uuid,
            id_usuario: cliente.id_usuario,
            busqueda: cliente.busqueda
          },
        });
        console.log('Registro exitoso')
      }
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
