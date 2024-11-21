import { query } from "../../../database/mysql";
import { Historial } from "../../domain/Historial";
import { Repository } from "../../domain/Repository";

export class MysqlRepository implements Repository {
  async getAll(): Promise<Historial[] | string> {
    const sql = "SELECT * FROM historial";
    try {
      const resultado = await query(sql, []);
      const data = JSON.parse(JSON.stringify(resultado));
      if(data.status==200){
        const clientes = Object.values(JSON.parse(JSON.stringify(data.data)));
        return clientes.map(
          (cliente: any) =>
            new Historial(
              cliente.uuid,
              cliente.fecha_busqueda,
              cliente.id_usuario,
              cliente.busqueda
            )
        );
      }else{
        throw(data.message);
      }
    } catch (error) {
      return String(error);
    }
  }

  async update(
    uuid: string,
    id_usuario: number,
    busqueda: string
  ): Promise<Historial | string> {
    const sql = "UPDATE historial SET id_usuario=?, busqueda=? WHERE uuid=?";
    const params: any[] = [id_usuario, busqueda, uuid];
    try {
      const result = await query(sql, params);
      const data = JSON.parse(JSON.stringify(result));
      if(data.status==200){
        return new Historial(uuid, null, id_usuario, busqueda);
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }
}
