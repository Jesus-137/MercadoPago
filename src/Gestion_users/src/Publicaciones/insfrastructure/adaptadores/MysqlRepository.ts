import { query } from "../../../database/mysql";
import { Publicaciones } from "../../domain/Publicaciones";
import { Repository } from "../../domain/Repository";

export class MysqlRepository implements Repository {
  async getByDay(id: number): Promise<string> {
    const sql = "SELECT DATE_FORMAT(fecha_creacion, '%Y-%m-%D') AS dia, COUNT(*) AS total_publicaciones FROM publicaciones where id_cliente=? GROUP BY dia ORDER BY dia;";
    console.log(id)
    try {
      const result = await query(sql, [id]);
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        console.log(data.data[0])
        const publicacion = JSON.stringify(data.data[0])
        return `${publicacion}`
      }else{
        console.log('hola')
        throw(data.message)
      }
    } catch (error) {
      console.log('hola')
      return String(error)
    }
  }
  async getAll(id_cliente: number|null): Promise<Publicaciones[] | string> {
    let sql;
    let params: any[];
    if(id_cliente==null){
      sql = "SELECT * FROM publicaciones"
      params = []
    }else{
      sql = "SELECT * FROM publicaciones WHERE id_cliente=?";
      params = [id_cliente]
    }
    try {
      console.log(sql)
      const resultado = await query(sql, params);
      const data = JSON.parse(JSON.stringify(resultado))
      if(data.status==200){
        const clientes = Object.values(JSON.parse(JSON.stringify(data.data[0])));
        console.log(clientes[0])
        return clientes.map(
          (cliente: any) =>
            new Publicaciones(
              cliente.id,
              cliente.uuid,
              cliente.titulo,
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
          data.data[0][0].id,
          uuid,
          data.data[0][0].titulo,
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
    titulo: string,
    descripcion: string,
    contenido: string,
    id_cliente: number
  ): Promise<Publicaciones | string> {
    const sql = "INSERT INTO publicaciones (uuid, titulo, descripcion, contenido, id_cliente) VALUES (?, ?, ?, ?, ?)";
    const params: any[] = [uuid, titulo, descripcion, contenido, id_cliente];
    try {
      const result = await query(sql, params);
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        return new Publicaciones(data.data.insertid,uuid, titulo, descripcion, contenido, id_cliente);
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }
}
