import { Clientes } from "./Clientes";

export interface Repository {
  getByuuid(uuid: string): Promise<Clientes | string>;
  delete(uuid: string): Promise <string>;
  update(
    uuid: string,
    tipo: string,
    generos: string,
    tipo_evento: string,
    ubicacion: string
  ): Promise <string>;
  getAll(): Promise<Clientes[]|string>;
  create(
    uuid: string,
    id_lead: number,
    nombre: string,
    password: string,
    tipo: string,
    generos: string,
    ubicacion: string,
    tipo_evento: string
  ): Promise <Clientes |  string>;
}
