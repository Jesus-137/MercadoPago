import { Repository } from "../domain/Repository";

export class UpdateUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    nombre: string,
    password: string,
    uuid: string,
    tipo: string,
    generos: string,
    tipo_evento: string,
    ubicacion: string
  ): Promise<string> {
    const result = await this.movimientoRepo.update(
      nombre, 
      password,
      uuid,
      tipo,
      generos,
      tipo_evento,
      ubicacion
    );
    console.log(result);
    return result;
  }
}
