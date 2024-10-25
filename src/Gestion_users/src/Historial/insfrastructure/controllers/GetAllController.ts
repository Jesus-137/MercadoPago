import { Request, Response } from "express";
import { GetAllUseCase } from "../../application/GetAllUseCase";

export class GetAllClientesController {
  constructor(readonly getAllProductUseCase: GetAllUseCase) {}

  async run(req: Request, res: Response) {
    // Obtener los campos de query params
    const campos = req.query.fields ? String(req.query.fields).split(',') : [];
    
    // Obtener filtros de query params (ejemplo: ?id_usuario=1)
    const filtros = req.query;

    try {
      const clientes = await this.getAllProductUseCase.run();

      if (clientes) {
        // Filtrar clientes según los filtros en la URL
        let clientesFiltrados = clientes;

        // Aplicar cada filtro
        Object.keys(filtros).forEach((key) => {
          if (key !== 'fields') { // Ignorar el campo 'campos' si está presente
            clientesFiltrados = clientesFiltrados.filter((cliente: any) => {
              return cliente[key] && String(cliente[key]) === String(filtros[key]);
            });
          }
        });

        // Si se especifican campos, filtrar la respuesta
        const response = clientesFiltrados.map((cliente: any) => {
          const clienteFiltrado: any = {};

          if (campos.length > 0) {
            campos.forEach((campo) => {
              if (cliente[campo] !== undefined) {
                clienteFiltrado[campo] = cliente[campo];
              }
            });
          } else {
            // Si no se especifican campos, devolver todos
            return {
              id: cliente.uuid,
              fecha_busqueda: cliente.fecha_busqueda,
              id_usuario: cliente.id_usuario,
              busqueda: cliente.busqueda,
            };
          }

          return clienteFiltrado;
        });

        res.status(200).send(response);
      } else {
        res.status(400).send({
          status: "error",
          msn: "Ocurrió algún problema",
        });
      }
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrió un error",
        msn: error,
      });
    }
  }
}
