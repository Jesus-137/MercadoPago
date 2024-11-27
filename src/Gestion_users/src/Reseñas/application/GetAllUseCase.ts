import { Repository } from "../domain/Repository";
import { Reseñas } from "../domain/Reseñas";

export class GetAllUseCase{
    constructor(private repo: Repository){}

    async run (id_usuario: number): Promise<Reseñas[]|string>{
        try {
            const resenas = await this.repo.getAll(id_usuario);
            return resenas
        } catch (error) {
            return String(error)
        }
    }
}