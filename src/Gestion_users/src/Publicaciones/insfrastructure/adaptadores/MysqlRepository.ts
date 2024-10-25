import { query } from "../../../database/mysql";
import { Publicaciones } from "../../domain/Publicaciones";
import { Repository } from "../../domain/Repository";

export class MysqlRepository implements Repository {
  async getAll(): Promise<Publicaciones[] | null> {
    const sql = "SELECT * FROM publicaciones";
    try {
      const [data]: any = await query(sql, []);
      const clientes = Object.values(JSON.parse(JSON.stringify(data)));
      return clientes.map(
        (cliente: any) =>
          new Publicaciones(
            cliente.uuid,
            cliente.descripcion,
            cliente.contenido,
            cliente.id_cliente
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getByuuid(uuid: string): Promise<Publicaciones | null> {
    const sql = "SELECT * FROM publicaciones where uuid=?";
    const params: any[] = [uuid];
    try {
      const [result]: any = await query(sql, params);
      console.log(result);
      return new Publicaciones(
        uuid,
        result[0].descripcion,
        result[0].contenido,
        result[0].id_cliente
      )
    } catch (error) {
      return null;
    }
  }

  async create(
    uuid: string,
    descripcion: string,
    contenido: string,
    id_cliente: number
  ): Promise<Publicaciones | null> {
    const sql = "INSERT INTO publicaciones (uuid, descripcion, contenido, id_cliente) VALUES (?, ?, ?, ?)";
    const params: any[] = [uuid, descripcion, contenido, id_cliente];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      return new Publicaciones(uuid, descripcion, contenido, id_cliente);
    } catch (error) {
      return null;
    }
  }
}
