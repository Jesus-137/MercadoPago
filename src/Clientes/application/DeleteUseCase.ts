import { Repository } from "../domain/Repository";

export class DeleteUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(uuid: string): Promise<string | null> {
    try {
      const result = await this.movimientoRepo.delete(uuid);
      console.log(result);
      return result;
    } catch (error) {
      return null;
    }
  }
}
