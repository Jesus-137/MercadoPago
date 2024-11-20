import { query } from "../../../database/mysql";
import { Clientes } from "../../domain/Clientes"; 
import { Repository } from "../../domain/Repository";

export class MysqlClientesRepository implements Repository {
  async create(
    uuid: string,
    id_lead: string,
    tipo: string,
    password: string,
    generos: string,
    ubicacion: string,
    tipo_evento: string
  ): Promise<Clientes | null> {
    const sql = "INSERT INTO clientes (uuid, id_lead, password, genero_musical, ubicacion, tipo_evento, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const params: any[] = [uuid, id_lead, password, generos, ubicacion, tipo_evento, tipo];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      return new Clientes(uuid, id_lead, tipo, password, generos, tipo_evento, ubicacion);
    } catch (error) {
      return null;
    }
  }

  async getAll(): Promise<Clientes[] | null> {
    const sql = 'SELECT * FROM clientes;';
    try {
      const [resultado]: any = await query(sql, []);
      const [clientes]: any = Object.values(JSON.parse(JSON.stringify(resultado)));
      return clientes.map((cliente: any)=>(
        new Clientes(
          cliente.uuid,
          cliente.id_lead,
          cliente.tipo,
          cliente.password,
          cliente.genero_musical,
          cliente.tipo_evento,
          cliente.ubicacion
        )
      ));
    } catch (error) {
      return null
    }
  }

  async delete(uuid: String): Promise<string | null> {
    const sql = "DELETE FROM clientes where uuid=?";
    const params: any[] = [uuid];
    try {
      const [result]: any = await query(sql, params);
      console.log(result);
      return 'Se eliminó correctamente'
    } catch (error) {
      return null;
    }
  }

  async update(uuid: string, tipo: string, generos: string, tipo_evento: string, ubicacion: string): Promise<string | null> {
    const sql = "UPDATE clientes SET tipo=?, genero_musical=?, tipo_evento=?, ubicacion=? WHERE uuid=?";
    const params: any[] = [tipo, generos, tipo_evento, ubicacion, uuid];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      return 'Se actualizo corectamente'
    } catch (error) {
      console.error("Error updating:", error);
      return null;
    }
  }

  async getByuuid(uuid: string): Promise<Clientes | null> {
    const sql = "SELECT * FROM clientes WHERE uuid=?;";
    try {
      const [clientes]: any = await query(sql, [uuid]);
      return new Clientes(
        clientes[0].uuid,
        clientes[0].id_lead,
        clientes[0].tipo,
        clientes[0].password,
        clientes[0].genero_musical,
        clientes[0].tipo_evento,
        clientes[0].ubicacion
      );
    } catch (error) {
      return null;
    }
  }
}
