import { Auditoria } from "../domian/Auditoria";
import { Repository } from "../domian/Repository";

export class GetByuuidUseCase{
    constructor (private repo: Repository){}

    async run (uuid: string): Promise<Auditoria|null>{
        try {
            const auditoria = await this.repo.getByuuid(uuid);
            return auditoria;
        } catch (error) {
            return null
        }
    }
}