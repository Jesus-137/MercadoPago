import { Reseñas } from "../domain/Reseñas"; 
import { Repository } from "../domain/Repository";

export class UpdateUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    uuid: string,
    id_usuario: number,
    id_publicacion: number,
    comentario: string,
    estrellas: number
  ): Promise<Reseñas | null> {
    try {
      const result = await this.movimientoRepo.update(
        uuid,
        id_usuario,
        id_publicacion,
        comentario,
        estrellas
      );
      console.log(result);
      return result;
    } catch (error) {
      return null;
    }
  }
}
