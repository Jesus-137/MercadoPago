import { Request, Response } from "express";
import { GetAllClientesUseCase } from "../../application/GetByuuidUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

export class GetAllClientesController {
  constructor(readonly getAllProductUseCase: GetAllClientesUseCase) {}

  async run(req: Request, res: Response) {
    const uuid: string = String(req.params.uuid);

    // Obtener los campos que el cliente quiere recibir desde los query params
    const campos = req.query.fields ? String(req.query.fields).split(',') : [];

    try {
      if (uuid!=''){
        const clientes = await this.getAllProductUseCase.run(uuid);

        if (typeof(clientes)!='string') {
          const cliente = JSON.parse(JSON.stringify(clientes))
          // Objeto para almacenar solo los campos solicitados
          let clientesFiltrados: any = {};

          if (campos.length > 0) {
            campos.forEach((campo) => {
              if (cliente[campo] !== undefined) {
                clientesFiltrados[campo] = cliente[campo];
              }
            });
          } else {
            // Si no se especifican campos, devolver todos
            clientesFiltrados = {
              id: clientes.uuid,
              nombre: clientes.nombre,
            };
          }

          res.status(200).send({
            status: 'Encontrado',
            data: clientesFiltrados
          });
        } else {
          throw (clientes);
        }
      }
    } catch (error) {
      produceMessage('Error', `{"tarjet": ${uuid}, "accion": ${String(error)}}`)
      res.status(400).send({
        status: "error",
        data: "Ocurrió un error",
        msn: error,
      });
    }
  }
}
