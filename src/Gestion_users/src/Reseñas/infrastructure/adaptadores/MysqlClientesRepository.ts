import { query } from "../../../database/mysql";
import { Reseñas } from "../../domain/Reseñas";
import { Repository } from "../../domain/Repository";

export class MysqlReseñasRepository implements Repository {
  async update(uuid: string, id_usuario: string, id_publicacion: string, comentario: string, estrellas: number): Promise<Reseñas | null> {
    const sql = "UPDATE resenas SET id_usuario=?, id_publicacion=?, comentario=?, estrellas=? WHERE uuid=?";
    const params: any[] = [id_usuario, id_publicacion, comentario, estrellas, uuid];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      return new Reseñas(uuid, id_usuario, id_publicacion, comentario, estrellas);
    } catch (error) {
      console.error("Error updating cliente:", error);
      return null;
    }
  }

  async create(
    uuid:string,
    id_usuario: string,
    id_publicacion: string,
    comentario: string,
    estrellas: number
  ): Promise<Reseñas | null> {
    const sql =
"INSERT INTO resenas (uuid, id_usuario, id_publicacion, comentario, estrellas) VALUES (?, ?, ?, ?, ?)";
    const params: any[] = [uuid, id_usuario, id_publicacion, comentario, estrellas];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      return new Reseñas(uuid, id_usuario, id_publicacion, comentario, estrellas);
    } catch (error) {
      return null;
    }
  }
}
