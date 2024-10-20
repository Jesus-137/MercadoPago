import { query } from "../../../database/mysql";
import { Usuarios } from "../../domain/Usuarios";
import { Repository } from "../../domain/Repository";

export class MysqlUsuariosRepository implements Repository {
  async getAll():Promise<Usuarios[]|null>{
    const sql = 'SELECT * FROM usuarios';
    try {
      const [result]: any = await query(sql, []);
      const usuarios = Object.values(JSON.parse(JSON.stringify(result)))
      return usuarios.map(
        (usuario: any)=>
          new Usuarios(
            usuario.uuid,
            usuario.nombre,
            usuario.password,
            usuario.telefono
          )
      );
    } catch (error) {
      return null;
    }
  }
  
  async update(uuid: string, nombre: string, password: string, telefono: string): Promise<Usuarios | null> {
    const sql = "UPDATE usuarios SET nombre=?, password=?, telefono=? WHERE uuid=?";
    const params: any[] = [nombre, password, telefono, uuid];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      return new Usuarios(uuid, nombre, password, telefono);
    } catch (error) {
      console.error("Error updating:", error);
      return null;
    }
  }
  
  async getByuuid(uuid: String): Promise<Usuarios | null> {
    const sql = "SELECT * FROM Usuarios WHERE uuid=?";
    try {
      const [data]: any = await query(sql, [uuid]);
      return new Usuarios(
        data[0].uuid,
        data[0].nombre,
        data[0].password,
        data[0].telefono
      )
    } catch (error) {
      return null;
    }
  }

  async delete(uuid: String): Promise<string | null> {
    const sql = "DELETE FROM usuarios where uuid=?";
    const params: any[] = [uuid];
    try {
      const [result]: any = await query(sql, params);
      console.log(result.affectedRows);
      return result.affectedRows
    } catch (error) {
      return null;
    }
  }

  async create(
    uuid: string,
    nombre: string,
    password: string,
    telefono: string
  ): Promise<Usuarios | null> {
    const sql =
"INSERT INTO Usuarios (uuid, nombre, password, telefono) VALUES (?, ?, ?, ?)";
    const params: any[] = [uuid, nombre, password, telefono];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      return new Usuarios(uuid, nombre, password, telefono);
    } catch (error) {
      return null;
    }
  }
}
