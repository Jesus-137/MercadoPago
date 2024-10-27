import { Auditoria } from "./Auditoria";

export interface Repository{
    crear(
        uuid: string,
        tarjet: string,
        accion: string
    ): Promise< Auditoria|null >
    getAll(): Promise<Auditoria[]|null>
    getByuuid(uuid: string): Promise<Auditoria|null>
    update(
        uuid: string,
        tarjet: string,
        accion: string
    ): Promise<Auditoria|null>
}