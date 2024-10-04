import { Clientes } from "../domain/Clientes";
import { Repository } from "../domain/Repository";

export class GetByuuidUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(uuid: string): Promise<Clientes | null> {
    try {
      const result = await this.movimientoRepo.getByuuid(uuid);
      console.log(result);
      return result;
    } catch (error) {
      return null;
    }
  }
}
