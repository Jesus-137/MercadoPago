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
  ): Promise<Clientes | string> {
    const sql = "INSERT INTO clientes (uuid, id_lead, password, genero_musical, ubicacion, tipo_evento, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const params: any[] = [uuid, id_lead, password, generos, ubicacion, tipo_evento, tipo];
    try {
      const resultado = await query(sql, params);
      const data = JSON.parse(JSON.stringify(resultado))
      if(data.status==200){
          return new Clientes(
            uuid,
            id_lead,
            tipo,
            password,
            generos,
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
        const [clientes]: any = Object.values(JSON.parse(JSON.stringify(data.data)));
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

  async update(uuid: string, tipo: string, generos: string, tipo_evento: string, ubicacion: string): Promise<string> {
    const sql = "UPDATE clientes SET tipo=?, genero_musical=?, tipo_evento=?, ubicacion=? WHERE uuid=?";
    const params: any[] = [tipo, generos, tipo_evento, ubicacion, uuid];
    try {
      const result = await query(sql, params);
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        return 'Se actualizo correctamente'
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
      const [resultado]: any = await query(sql, [uuid]);
      const data = JSON.parse(JSON.stringify(resultado));
      if(data.status==200){
        const [clientes]: any = data.data;
        return new Clientes(
          clientes[0].uuid,
          clientes[0].id_lead,
          clientes[0].tipo,
          clientes[0].password,
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
