import { Historial } from "../domain/Historial";
import { Repository } from "../domain/Repository";

export class GetAllUseCase {
  constructor(readonly Repo: Repository) {}

  async run(): Promise<Historial[] | string> {
    try {
      const result = await this.Repo.getAll();
      console.log(result);
      return result;
    } catch (error) {
      return String(error);
    }
  }
}
