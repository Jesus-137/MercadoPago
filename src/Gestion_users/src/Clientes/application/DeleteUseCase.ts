import { Repository } from "../domain/Repository";

export class DeleteUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(uuid: string): Promise<string> {
    const result = await this.movimientoRepo.delete(uuid);
    console.log(result);
    return result;
  }
}
