import { Reseñas } from "../domain/Reseñas";
import { Repository } from "../domain/Repository";
import { v4 as uuidv4 } from 'uuid';

export class CreateUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    id_usuario: number,
    id_publicacion: number,
    comentario: string,
    estrellas: number
  ): Promise<Reseñas | null> {
    try {
      const MyUUID = uuidv4();
      const cliente = await this.movimientoRepo.create(
        MyUUID,
        id_usuario,
        id_publicacion,
        comentario,
        estrellas
      );
      return cliente;
    } catch (error) {
      return null;
    }
  }
}
