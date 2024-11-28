import { Publicaciones } from "../domain/Publicaciones";
import { Repository } from "../domain/Repository";
import { v4 as uuidv4 } from 'uuid'

export class CreateUseCase {
  constructor(readonly Repo: Repository) {}

  async run(
    titulo: string,
    descripcion: string,
    contenido: string,
    id_cliente: number
  ): Promise<Publicaciones | string> {
    try {
      const MyUUID = uuidv4()
      const cliente = await this.Repo.create(
        MyUUID,
        titulo,
        descripcion,
        contenido,
        id_cliente
      );
      return cliente;
    } catch (error) {
      return String(error);
    }
  }
}
