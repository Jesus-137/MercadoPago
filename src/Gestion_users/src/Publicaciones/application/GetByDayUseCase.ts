import { Repository } from "../domain/Repository";

export class GetByDayUseCase{
    constructor(private repo: Repository){}

    async run (id: number):Promise<string>{
        const publicacion = await this.repo.getByDay(id)
        return publicacion
    }
}