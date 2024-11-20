import { Repository } from "../domain/Repository";

export class UpdateUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    uuid: string,
    tipo: string,
    generos: string,
    tipo_evento: string,
    ubicacion: string
  ): Promise<string | null> {
    try {
      const result = await this.movimientoRepo.update(
        uuid,
        tipo,
        generos,
        tipo_evento,
        ubicacion
      );
      console.log(result);
      return result;
    } catch (error) {
      return null;
    }
  }
}
