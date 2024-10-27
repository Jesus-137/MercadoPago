import { Repository } from "../domian/Repository";
import { Auditoria } from "../domian/Auditoria";
import { v4 as uuidv4 } from "uuid";

export class CrearUseCase{
    constructor(private repo: Repository){}

    async run (
        tarjet: string,
        accion: string
    ): Promise< Auditoria|null >{
        try {
            const uuid = uuidv4()
            const auditoria = await this.repo.crear(
                uuid,
                tarjet,
                accion
            );
            return auditoria;
        } catch (error) {
            return null;
        }
    }
}