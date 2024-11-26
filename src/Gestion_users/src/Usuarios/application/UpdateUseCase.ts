import { Repository } from "../domain/Repository";

export class UpdateClientesUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    uuid: string,
    nombre: string,
    password: string
  ): Promise<string> {
    try {
      const result = await this.movimientoRepo.update(
        uuid,
        nombre,
        password
      );
      console.log(result);
      return result;
    } catch (error) {
      return String(error);
    }
  }
}
