import { Reseñas } from "./Reseñas";

export interface Repository {
  create(
    uuid: string,
    id_usuario: number,
    id_publicacion: number,
    comentario: string,
    estrellas: number
  ): Promise<Reseñas | null>;
  update(
    uuid: string,
    id_usuario: number,
    id_publicacion: number,
    comentario: string,
    estrellas: number
  ): Promise<Reseñas|null>;
}
