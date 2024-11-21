import { query } from "../../../database/mysql";
import { Usuarios } from "../../domain/Usuarios";
import { Repository } from "../../domain/Repository";

export class MysqlUsuariosRepository implements Repository {
  async getAll():Promise<Usuarios[]|string>{
    const sql = 'SELECT * FROM usuarios';
    try {
      const result = await query(sql, []);
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        const usuarios = Object.values(JSON.parse(JSON.stringify(data.data)))
        return usuarios.map(
          (usuario: any)=>
            new Usuarios(
              usuario.id,
              usuario.uuid,
              usuario.nombre,
              usuario.password,
              usuario.telefono,
              usuario.correo
            )
        );
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }
  
  async update(uuid: string, nombre: string, password: string, telefono: string, correo: string): Promise<Usuarios | string> {
    const sql = "UPDATE usuarios SET nombre=?, password=?, telefono=? WHERE uuid=?;";
    const params: any[] = [nombre, password, telefono, uuid];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      const data = JSON.parse(JSON.stringify(result));
      if(data.status==200){
        return new Usuarios(result.insertid, uuid, nombre, password, telefono, correo);
      }else{
        throw(data.message)
      }
    } catch (error) {
      console.error("Error updating:", error);
      return String(error);
    }
  }
  
  async getByuuid(uuid: String): Promise<Usuarios | string> {
    const sql = "SELECT * FROM usuarios WHERE uuid=?";
    try {
      const result = await query(sql, [uuid]);
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        return new Usuarios(
          data.data[0].id,
          data.data[0].uuid,
          data.data[0].nombre,
          data.data[0].password,
          data.data[0].telefono,
          data.data[0].correo
        )
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }

  async delete(uuid: String): Promise<string> {
    const sql = "DELETE FROM usuarios where uuid=?";
    const params: any[] = [uuid];
    try {
      const result = await query(sql, params);
      console.log(result);
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        return 'Eliminado'
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }

  async create(
    uuid: string,
    nombre: string,
    password: string,
    telefono: string,
    correo: string
  ): Promise<Usuarios | string> {
    const sql = "INSERT INTO Usuarios (uuid, nombre, password, telefono, correo) VALUES (?, ?, ?, ?, ?)";
    const params: any[] = [uuid, nombre, password, telefono, correo];
    try {
      const [result]: any = await query(sql, params);
      console.log(result)
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        return new Usuarios(result.insertid, uuid, nombre, password, telefono, correo);
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }
}
