import { Request, Response } from "express";
import { GetAllUseCase } from "../../application/GetAllUseCase";

export class GetAllController {
  constructor(readonly getAllUseCase: GetAllUseCase) {}

  async run(req: Request, res: Response) {
    const filtros = req.query;
    const requestedFields = filtros.fields ? String(filtros.fields).split(',') : null;

    try {
      const usuarios = await this.getAllUseCase.run();
      if (usuarios) {
        let usuariosFiltrados = usuarios;

        // Filtrar usuarios basados en otros filtros en query (excluyendo 'fields')
        Object.keys(filtros).forEach((key) => {
          if (key !== 'fields') {
            usuariosFiltrados = usuariosFiltrados.filter((cliente: any) => {
              return cliente[key] && String(cliente[key]) === String(filtros[key]);
            });
          }
        });

        if (!(usuariosFiltrados.length > 0)) {
          throw ('No se encontró el usuario');
        }

        // Mapear datos a los campos especificados en 'fields' o a los predeterminados
        const data = usuariosFiltrados.map((usuario: any) => {
          if (requestedFields) {
            // Crear un objeto con solo los campos solicitados
            return requestedFields.reduce((filteredUser: any, field) => {
              if (usuario[field] !== undefined) {
                filteredUser[field] = usuario[field];
              }
              return filteredUser;
            }, {});
          } else {
            // Campos predeterminados si 'fields' no se especifica
            return {
              id: usuario.uuid,
              nombre: usuario.nombre,
              telefono: usuario.telefono
            };
          }
        });

        return res.status(200).send({
          status: 'encontrado',
          data
        });
      } else {
        throw ('Ocurrió un error desconocido');
      }
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        msn: error || 'Ocurio un error desconocido'
      });
    }
  }
}
