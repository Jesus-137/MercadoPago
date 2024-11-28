import { Request, Response } from "express";
import { GetAllUseCase } from "../../application/GetAllUseCase";
import { Usuarios_uuid } from "../../../../../ValueObjects/Usuarios_uuid";
import { Usuarios_Nombre } from "../../../../../ValueObjects/Usuarios_nombre";

export class GetAllController {
  constructor(readonly getAllUseCase: GetAllUseCase) {}

  async run(req: Request, res: Response) {
    const filtros = req.query; // Obtener todos los filtros desde la query string
    const requestedFields = filtros.fields ? String(filtros.fields).split(",") : null;

    try {
        const id_usuario = req.body.id_cliente;
        const usuarios = await this.getAllUseCase.run(id_usuario); // Obtener todos los usuarios desde el caso de uso
        console.log('hoolla',usuarios)
        if (typeof(usuarios)=='object') {
            let usuariosFiltrados = usuarios;

            // Filtrar usuarios por género musical, tipo de evento y ubicación
            Object.keys(filtros).forEach((filtro) => {
            if (filtro!=='fields') {
                usuariosFiltrados = usuariosFiltrados.filter((cliente: any) => {
                return cliente[filtro] && String(cliente[filtro]) === String(filtros[filtro]);
                });
            }
            });

            if (!(usuariosFiltrados.length > 0)) {
              throw "No se encontraron registros con los filtros especificados.";
            }

            const nombre_usuarios = new Array()
            const id_usuarios = new Array()
            
            for (let index = 0; index < usuariosFiltrados.length; index++) {
              const id_usuario = await new Usuarios_uuid().get(usuariosFiltrados[index].id_usuario)
              const nombre_usuario = await new Usuarios_Nombre().get(usuariosFiltrados[index].id_usuario)
              id_usuarios.push(id_usuario)
              nombre_usuarios.push(nombre_usuario)
            }

            // Mapear datos a los campos especificados en 'fields' o a los predeterminados
            const data = usuariosFiltrados.map((usuario: any, index: number) => {
            if (requestedFields) {
                // Crear un objeto con solo los campos solicitados
                return requestedFields.reduce((filteredUser: any, field) => {
                if (usuario[field] !== undefined) {
                    filteredUser[field] = usuario[field];
                }
                return filteredUser;
                }, {});
            } else {
                return {
                  id: usuario.uuid,
                  id_usuario: id_usuarios[index],
                  comentario: usuario.comentario,
                  estrellas: usuario.estrellas,
                  nombre_usuario: nombre_usuarios[index]
                };
            }
            });

            return res.status(200).send({
            status: "encontrado",
            data,
            });
        } else {
            throw (usuarios);
        }
    } catch (error) {
      return res.status(400).send({
        status: "error",
        msn: error || "Ocurrió un error desconocido.",
      });
    }
  }
}
