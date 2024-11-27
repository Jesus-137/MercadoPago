import { Reseñas } from "./Reseñas";

export interface Repository {
  getAll(id_usuario: number): Promise<Reseñas[]|string>;
  create(
    uuid: string,
    id_usuario: number,
    id_publicacion: number,
    comentario: string,
    estrellas: number
  ): Promise<Reseñas | string>;
  update(
    uuid: string,
    id_usuario: number,
    id_publicacion: number,
    comentario: string,
    estrellas: number
  ): Promise<Reseñas|string>;
}
