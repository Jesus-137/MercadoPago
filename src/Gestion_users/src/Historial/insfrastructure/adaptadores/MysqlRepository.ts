import { query } from "../../../database/mysql";
import { Historial } from "../../domain/Historial";
import { Repository } from "../../domain/Repository";

export class MysqlRepository implements Repository {
  async getAll(): Promise<Historial[] | null> {
    const sql = "SELECT * FROM historial";
    try {
      const [data]: any = await query(sql, []);
      const clientes = Object.values(JSON.parse(JSON.stringify(data)));
      return clientes.map(
        (cliente: any) =>
          new Historial(
            cliente.uuid,
            cliente.fecha_busqueda,
            cliente.id_usuario,
            cliente.busqueda
          )
      );
    } catch (error) {
      return null;
    }
  }

  async update(
    uuid: string,
    id_usuario: number,
    busqueda: string
  ): Promise<Historial | null> {
    const sql = "UPDATE historial SET id_usuario=?, busqueda=? WHERE uuid=?";
    const params: any[] = [id_usuario, busqueda, uuid];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      return new Historial(uuid, null, id_usuario, busqueda);
    } catch (error) {
      return null;
    }
  }
}
