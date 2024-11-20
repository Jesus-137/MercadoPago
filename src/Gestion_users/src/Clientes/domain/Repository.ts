import { Clientes } from "./Clientes";

export interface Repository {
  getByuuid(uuid: string): Promise<Clientes | null>;
  delete(uuid: string): Promise <string | null>;
  update(
    uuid: string,
    tipo: string,
    generos: string,
    tipo_evento: string,
    ubicacion: string
  ): Promise <string | null>;
  getAll(): Promise<Clientes[]|null>;
  create(
    uuid: string,
    id_lead: string,
    tipo: string,
    password: string,
    generos: string,
    ubicacion: string,
    tipo_evento: string
  ): Promise <Clientes |  null>;
}
