import { query } from "../../../database/mysql";
import { Clientes } from "../../domain/Clientes"; 
import { Repository } from "../../domain/Repository";

export class MysqlClientesRepository implements Repository {
  async create(
    uuid: string,
    nombre: string,
    tipo: string,
    telefono: string,
    password: string,
    generos: string,
    upicacion: string,
    tipo_evento: string
  ): Promise<Clientes | null> {
    const sql = "INSERT INTO clientes (uuid, nombre, password, genero_musical, ubicacion, tipo_evento, tipo, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const params: any[] = [uuid, nombre, password, generos, upicacion, tipo_evento, tipo, telefono];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      return new Clientes(uuid, nombre, tipo, password, telefono);
    } catch (error) {
      return null;
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

  async update(uuid: string, nombre: string, tipo: string, password: string, telefono: string): Promise<Clientes | null> {
    const sql = "UPDATE clientes SET nombre=?, tipo=?, password=?, telefono=? WHERE uuid=?";
    const params: any[] = [nombre, tipo, password, telefono, uuid];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      return new Clientes(uuid, nombre, tipo, password, telefono);
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
        clientes[0].nombre,
        clientes[0].tipo,
        clientes[0].password,
        clientes[0].telefono
      );
    } catch (error) {
      return null;
    }
  }
}
