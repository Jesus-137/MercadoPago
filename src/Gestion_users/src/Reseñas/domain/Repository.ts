import { Reseñas } from "./Reseñas";

export interface Repository {
  create(
    uuid: string,
    id_usuario: string,
    id_publicacion: string,
    comentario: string,
    estrellas: number
  ): Promise<Reseñas | null>;
  update(
    uuid: string,
    id_usuario: string,
    id_publicacion: string,
    comentario: string,
    estrellas: number
  ): Promise<Reseñas|null>;
}
