import { Request, Response } from "express";
import { CreateClientesUseCase } from "../../application/CreateUseCase";

export class CreateClienteController {
  constructor (
    readonly createClienteUseCase: CreateClientesUseCase,
    ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      console.log(data.telefono)
      const cliente = await this.createClienteUseCase.run(
        data.nombre,
        data.password,
        data.telefono
      );
      if (cliente){
        //Code HTTP : 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            id: cliente.uuid,
            nombre: cliente.nombre,
            telefono: cliente.telefono,
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
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
