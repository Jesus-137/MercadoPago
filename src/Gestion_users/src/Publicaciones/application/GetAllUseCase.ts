import { Publicaciones } from "../domain/Publicaciones";
import { Repository } from "../domain/Repository";

export class GetAllUseCase {
  constructor(readonly Repo: Repository) {}

  async run(id_cliente: number|null): Promise<Publicaciones[] | string> {
    try {
      const result = await this.Repo.getAll(id_cliente);
      return result;
    } catch (error) {
      return String(error);
    }
  }
}
