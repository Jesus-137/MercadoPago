import { Publicaciones } from "../domain/Publicaciones";
import { Repository } from "../domain/Repository";

export class GetAllUseCase {
  constructor(readonly Repo: Repository) {}

  async run(): Promise<Publicaciones[] | null> {
    try {
      const result = await this.Repo.getAll();
      return result;
    } catch (error) {
      return null;
    }
  }
}
