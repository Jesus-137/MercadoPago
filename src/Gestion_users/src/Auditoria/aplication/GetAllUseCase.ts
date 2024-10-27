import { Auditoria } from "../domian/Auditoria";
import { Repository } from "../domian/Repository";

export class GetAllUseCase{
    constructor(private repo: Repository){}

    async run (): Promise<Auditoria[]|null>{
        try {
            const auditoria = await this.repo.getAll();
            return auditoria;
        } catch (error) {
            return null;
        }
    }
}