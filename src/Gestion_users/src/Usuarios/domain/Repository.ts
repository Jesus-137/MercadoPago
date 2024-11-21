import { Usuarios } from "./Usuarios";


export interface Repository {
  getByuuid(uuid: string): Promise<Usuarios | string>;
  getAll():Promise<Usuarios[] | string>;
  delete(userId: string): Promise<string>;
  create(
    uuid: string,
    nombre: string,
    password: string,
    telefono: string,
    correo: string
  ): Promise<Usuarios | string>;
  update(
    uuid:string,
    nombre: string,
    password: string,
    telefono: string,
    correo: string
  ): Promise<Usuarios|string>;
}
