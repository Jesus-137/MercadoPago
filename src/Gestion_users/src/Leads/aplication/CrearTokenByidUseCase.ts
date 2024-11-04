import { Repository } from "../domain/Repository";

export class CrearTokenByidUseCase{
    constructor(private repo: Repository){}

    async run (uuid: string):Promise<string|null>{
        try {
            const token = await this.repo.crearTokenByid(uuid)
            return token
        } catch (error) {
            return null
        }
    }
}