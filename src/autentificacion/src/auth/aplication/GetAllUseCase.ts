import { Repository } from "../domain/Repository";
import { Tokens } from "../domain/Tokens";

export class GetAllUseCase{
    constructor(private repo: Repository){}

    async run (): Promise<Tokens[]|null>{
        try {
            const tokens = await this.repo.getAll()
            return tokens;
        } catch (error) {
            return null;
        }
    }
}