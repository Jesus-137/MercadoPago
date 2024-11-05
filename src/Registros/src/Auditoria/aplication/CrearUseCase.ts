import { Repository } from "../domian/Repository";
import { Auditoria } from "../domian/Auditoria";

export class CrearUseCase{
    constructor(private repo: Repository){}

    async run (
        tarjet: string,
        accion: string
    ): Promise< Auditoria|null >{
        try {
            const auditoria = await this.repo.crear(
                tarjet,
                accion
            );
            return auditoria;
        } catch (error) {
            return null;
        }
    }
}