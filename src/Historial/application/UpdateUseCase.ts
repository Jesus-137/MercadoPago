import { Historial } from "../domain/Historial";
import { Repository } from "../domain/Repository";

export class UpdateUseCase {
  constructor(readonly Repo: Repository) {}

  async run(
    uuid:string,
    fecha_busqueda: string,
    id_usuario: string,
    busqueda: string
  ): Promise<Historial | null> {
    try {
      const cliente = await this.Repo.update(
        uuid,
        fecha_busqueda,
        id_usuario,
        busqueda
      );
      return cliente;
    } catch (error) {
      return null;
    }
  }
}
