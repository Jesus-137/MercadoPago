import { query } from "../../../database/mysql";
import { Clientes } from "../../domain/Clientes"; 
import { Repository } from "../../domain/Repository";

export class MysqlClientesRepository implements Repository {
  async create(
    uuid: string,
    id_lead: number,
    foto_perfil: string,
    nombre: string,
    password: string,
    tipo: string,
    genero_musical: string,
    ubicacion: string,
    tipo_evento: string
  ): Promise<Clientes | string> {
    const sql = "INSERT INTO clientes (uuid, id_lead, foto_perfil, nombre, password, tipo, genero_musical, tipo_evento, ubicacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const params: any[] = [uuid, id_lead, foto_perfil, nombre, password, tipo, genero_musical, tipo_evento, ubicacion];
    try {
      const resultado = await query(sql, params);
      const data = JSON.parse(JSON.stringify(resultado))
      console.log(data);
      if(data.status==200){
          return new Clientes(
            uuid,
            id_lead,
            foto_perfil,
            nombre,
            password,
            tipo,
            genero_musical,
            tipo_evento,
            ubicacion
          )
      }else{
          throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }

  async getAll(): Promise<Clientes[] | string> {
    const sql = 'SELECT * FROM clientes;';
    try {
      const resultado = await query(sql, []);
      const data = JSON.parse(JSON.stringify(resultado))
      if(data.status==200){
        console.log(data)
        const [clientes]: any = Object.values(JSON.parse(JSON.stringify(data.data)));
        return clientes.map((cliente: any)=>(
          new Clientes(
            cliente.uuid,
            cliente.id_lead,
            cliente.foto_perfil,
            cliente.nombre,
            cliente.password,
            cliente.tipo,
            cliente.genero_musical,
            cliente.tipo_evento,
            cliente.ubicacion
          )
        ));
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error)
    }
  }

  async delete(uuid: String): Promise<string> {
    const sql = "DELETE FROM clientes where uuid=?";
    const params: any[] = [uuid];
    try {
      const result = await query(sql, params);
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        return 'Se elimino corectamente'
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }

  async update(nombre: string, password:string, uuid: string, tipo: string, generos: string, tipo_evento: string, ubicacion: string): Promise<string> {
    const sql = "UPDATE clientes SET nombre=? password=? tipo=?, genero_musical=?, tipo_evento=?, ubicacion=? WHERE uuid=?";
    const params: any[] = [nombre, password, tipo, generos, tipo_evento, ubicacion, uuid];
    try {
      const result = await query(sql, params);
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        if(data.data[0].affectedRows!=0){
          return 'Se actualizo correctamente'
        }else{
          throw('No se encontro al usuario')
        }
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error)
    }
  }

  async getByuuid(uuid: string): Promise<Clientes | string> {
    const sql = "SELECT * FROM clientes WHERE uuid=?;";
    try {
      const resultado = await query(sql, [uuid]);
      const data = JSON.parse(JSON.stringify(resultado));
      if(data.status==200){
        const [clientes]: any = Object.values(JSON.parse(JSON.stringify(data.data)));
        console.log('hola', clientes)
        return new Clientes(
          clientes[0].uuid,
          clientes[0].id_lead,
          clientes[0].foto_perfil,
          clientes[0].nombre,
          clientes[0].password,
          clientes[0].tipo,
          clientes[0].genero_musical,
          clientes[0].tipo_evento,
          clientes[0].ubicacion
        );
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }
}
