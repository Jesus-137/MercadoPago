import { Auditoria } from "../domian/Auditoria";
import { Repository } from "../domian/Repository";

export class UpdateUseCase{
    constructor (private repo: Repository){}

    async run (
        uuid: string,
        tarjet: string,
        accion: string,
    ): Promise<Auditoria|null>{
        try {
            const auditoria = await this.repo.update(
                uuid,
                tarjet,
                accion
            );
            return auditoria
        } catch (error) {
            return null
        }
    }
}