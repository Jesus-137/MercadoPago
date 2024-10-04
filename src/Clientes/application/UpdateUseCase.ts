import { Clientes } from "../domain/Clientes";
import { Repository } from "../domain/Repository";

export class UpdateUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    uuid: string,
    nombre: string,
    password: string,
    tipo: string,
    phone: string
  ): Promise<Clientes | null> {
    try {
      const result = await this.movimientoRepo.update(
        uuid,
        nombre,
        password,
        tipo,
        phone
      );
      console.log(result);
      return result;
    } catch (error) {
      return null;
    }
  }
}
