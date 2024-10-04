import { Usuarios } from "./Usuarios";


export interface Repository {
  getByuuid(uuid: string): Promise<Usuarios | null>;
  delete(userId: string): Promise<string | null>
  create(
    uuid: string,
    nombre: string,
    password: string,
    telefono: string
  ): Promise<Usuarios | null>;
  update(
    uuid:string,
    nombre: string,
    password: string,
    telefono: string
  ): Promise<Usuarios|null>;
}
