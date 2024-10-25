import { Usuarios } from "../domain/Usuarios";
import { Repository } from "../domain/Repository";

export class GetAllClientesUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(uuid: string): Promise<Usuarios | null> {
    try {
      const result = await this.movimientoRepo.getByuuid(uuid);
      console.log(result);
      return result;
    } catch (error) {
      return null;
    }
  }
}
