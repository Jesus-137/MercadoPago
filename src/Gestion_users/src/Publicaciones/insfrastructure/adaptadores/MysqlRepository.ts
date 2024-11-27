import { query } from "../../../database/mysql";
import { Publicaciones } from "../../domain/Publicaciones";
import { Repository } from "../../domain/Repository";

export class MysqlRepository implements Repository {
  async getAll(id_cliente: number): Promise<Publicaciones[] | string> {
    const sql = "SELECT * FROM publicaciones WHERE id_cliente=?";
    try {
      const resultado = await query(sql, [id_cliente]);
      const data = JSON.parse(JSON.stringify(resultado))
      if(data.status==200){
        console.log(data.data[0])
        const clientes = Object.values(JSON.parse(JSON.stringify(data.data[0])));
        return clientes.map(
          (cliente: any) =>
            new Publicaciones(
              cliente.uuid,
              cliente.descripcion,
              cliente.contenido,
              cliente.id_cliente
            )
        );
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }

  async getByuuid(uuid: string): Promise<Publicaciones | string> {
    const sql = "SELECT * FROM publicaciones where uuid=?";
    const params: any[] = [uuid];
    try {
      const result = await query(sql, params);
      const data = JSON.parse(JSON.stringify(result));
      if(data.status==200){
        return new Publicaciones(
          uuid,
          data.data[0][0].descripcion,
          data.data[0][0].contenido,
          data.data[0][0].id_cliente
        )
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }

  async create(
    uuid: string,
    descripcion: string,
    contenido: string,
    id_cliente: number
  ): Promise<Publicaciones | string> {
    const sql = "INSERT INTO publicaciones (uuid, descripcion, contenido, id_cliente) VALUES (?, ?, ?, ?)";
    const params: any[] = [uuid, descripcion, contenido, id_cliente];
    try {
      const result = await query(sql, params);
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        return new Publicaciones(uuid, descripcion, contenido, id_cliente);
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }
}
