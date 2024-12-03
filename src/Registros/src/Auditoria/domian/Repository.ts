import { Auditoria } from "./Auditoria";

export interface Repository{
    crear(
        tarjet: string,
        accion: string,
        tipo: string
    ): Promise< Auditoria|null >
    getAll(): Promise<Auditoria[]|null>
    getByuuid(uuid: string): Promise<Auditoria|null>
}