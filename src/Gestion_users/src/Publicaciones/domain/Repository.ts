import { Publicaciones } from "./Publicaciones";

export interface Repository {
  getAll(id_cliente: number): Promise<Publicaciones[] | string>;
  getByuuid(uuid: string): Promise<Publicaciones | string>
  create(
    uuid:string,
    descripcion: string,
    contenido: string,
    id_cliente: number
  ): Promise<Publicaciones | string>;
}
