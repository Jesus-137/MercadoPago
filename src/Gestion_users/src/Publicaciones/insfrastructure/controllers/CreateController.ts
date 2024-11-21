import { Request, Response } from "express";
import { CreateUseCase } from "../../application/CreateUseCase";

export class CreateController {
  constructor (
    readonly createClienteUseCase: CreateUseCase,
    ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const id_cliente = parseInt(data.id_cliente)
      if (data.descripcion!=''||data.contenido!=''||!isNaN(id_cliente)){
        const cliente = await this.createClienteUseCase.run(
          data.descripcion,
          data.contenido,
          id_cliente
        );
        if (typeof(cliente)=='object'){
          //Code HTTP : 201 -> Creado
          res.status(201).send({
            status: "success",
            data: {
              id: cliente.uuid,
              descripcion: cliente.descripcion,
              contenido: cliente.contenido
            },
          });
          console.log('Registro exitoso')
        }
        else
          throw (cliente);
      }else{
        throw ('Campos insuficiente por favor de verificarlos');
      }
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
