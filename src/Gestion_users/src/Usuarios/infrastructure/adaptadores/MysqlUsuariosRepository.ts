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
        const usuarios = Object.values(JSON.parse(JSON.stringify(data.data[0])))
        console.log(usuarios)
        return usuarios.map(
          (usuario: any)=>
            new Usuarios(
              usuario.id,
              usuario.uuid,
              usuario.id_lead,
              usuario.nombre,
              usuario.password
            )
        );
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }
  
  async update(uuid: string, nombre: string, password: string): Promise<string> {
    const sql = "UPDATE usuarios SET nombre=?, password=? WHERE uuid=?;";
    const params: any[] = [nombre, password, uuid];
    try {
      const result = await query(sql, params);
      console.log(result)
      const data = JSON.parse(JSON.stringify(result));
      if(data.status==200){
        return '1'
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
          data.data[0].id_lead,
          data.data[0].nombre,
          data.data[0].password
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
    id_lead: number,
    nombre: string,
    password: string
  ): Promise<Usuarios | string> {
    const sql = "INSERT INTO Usuarios (uuid, id_lead, nombre, password) VALUES (?, ?, ?, ?)";
    const params: any[] = [uuid, id_lead, nombre, password];
    try {
      const result = await query(sql, params);
      console.log(result)
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        return new Usuarios(data.insertid, uuid, id_lead, nombre, password);
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }
}
