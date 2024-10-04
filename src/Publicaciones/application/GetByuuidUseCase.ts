import { Publicaciones } from "../domain/Publicaciones";
import { Repository } from "../domain/Repository";

export class GetByuuidUseCase {
  constructor(readonly Repo: Repository) {}

  async run(uuid: string): Promise<Publicaciones | null> {
    try {
      const result = await this.Repo.getByuuid(uuid);
      return result;
    } catch (error) {
      return null;
    }
  }
}
