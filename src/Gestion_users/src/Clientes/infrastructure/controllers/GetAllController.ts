import { Request, Response } from "express";
import { GetAllUseCase } from "../../application/GetAllUseCase";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";
import bcrypt from 'bcrypt';

export class GetAllController {
  constructor(readonly getAllUseCase: GetAllUseCase) {}

  async run(req: Request, res: Response) {
    const filtros = req.query; // Obtener todos los filtros desde la query string
    console.log(filtros)
    const requestedFields = filtros.fields ? String(filtros.fields).split(",") : null;

    try {
      const usuarios = await this.getAllUseCase.run(); // Obtener todos los usuarios desde el caso de uso
      if (typeof(usuarios)=='object') {
        let usuariosFiltrados = usuarios;

        // Filtrar usuarios por género musical, tipo de evento y ubicación
        Object.keys(filtros).forEach((filtro) => {
          if (filtro!=='fields') {
            usuariosFiltrados = usuariosFiltrados.filter(async (cliente: any) => {
              if (filtro=='password'){
                const isMatch = await bcrypt.compare(String(cliente[filtro]), String(filtros[filtro]));
                if (isMatch){
                  cliente[filtro]=true
                }else{
                  cliente[filtro]=false
                }
              }else{
                return cliente[filtro] && String(cliente[filtro]) === String(filtros[filtro]);
              }
            });
          }
        });

        if (!(usuariosFiltrados.length > 0)) {
          throw "No se encontraron registros con los filtros especificados.";
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
            if (usuario['password']){
              // Campos predeterminados si 'fields' no se especifica
              return {
                id: usuario.uuid,
                nombre: usuario.nombre,
              };
            }else{
              return "Contraseña incorecta"
            }
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
      produceMessage('Error', `{"tarjet": "Cliente", "accion": "${String(error)}"}`)
      return res.status(400).send({
        status: "error",
        msn: error || "Ocurrió un error desconocido.",
      });
    }
  }
}
