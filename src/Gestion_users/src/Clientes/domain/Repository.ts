import { Clientes } from "./Clientes";

export interface Repository {
  getByuuid(uuid: string): Promise<Clientes | null>;
  delete(uuid: string): Promise <string | null>;
  update(
    uuid: string,
    nombre: string,
    tipo: string,
    telefono: string,
    password: string
  ): Promise <Clientes | null>
  create(
    uuid: string,
    nombre: string,
    tipo: string,
    telefono: string,
    password: string
  ): Promise <Clientes |  null>
}
