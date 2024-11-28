import { Publicaciones } from "./Publicaciones";

export interface Repository {
  getAll(id_cliente: number|null): Promise<Publicaciones[] | string>;
  getByuuid(uuid: string): Promise<Publicaciones | string>
  create(
    uuid:string,
    titulo: string,
    descripcion: string,
    contenido: string,
    id_cliente: number
  ): Promise<Publicaciones | string>;
}
