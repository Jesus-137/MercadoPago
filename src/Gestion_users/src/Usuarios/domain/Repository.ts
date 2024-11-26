import { Usuarios } from "./Usuarios";


export interface Repository {
  getByuuid(uuid: string): Promise<Usuarios | string>;
  getAll():Promise<Usuarios[] | string>;
  delete(userId: string): Promise<string>;
  create(
    uuid: string,
    id_lead: number,
    nombre: string,
    password: string
  ): Promise<Usuarios | string>;
  update(
    uuid:string,
    nombre: string,
    password: string
  ): Promise<string>;
}
