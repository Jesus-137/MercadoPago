import { Publicaciones } from "./Publicaciones";

export interface Repository {
  getAll(): Promise<Publicaciones[] | null>;
  getByuuid(uuid: string): Promise<Publicaciones | null>
  create(
    uuid:string,
    descripcion: string,
    contenido: string,
    id_cliente: number
  ): Promise<Publicaciones | null>;
}
