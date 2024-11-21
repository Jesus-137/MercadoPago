import { Repository } from "../domain/Repository";

export class UpdateUseCase{
    constructor(private repo: Repository){}

    async run (habilitado: number, uuid: string): Promise<string|null>{
        try {
            const token = await this.repo.update(habilitado, uuid);
            return token;
        } catch (error) {
            return null
        }
    }
}