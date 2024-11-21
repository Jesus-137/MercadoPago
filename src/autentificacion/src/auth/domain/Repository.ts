import { Tokens } from "./Tokens";

export interface Repository{
    crear(
        uuid: string,
        token: string,
        habilitado: number
    ): Promise<Tokens|null>
    getAll(): Promise<Tokens[]|null>
    update(
        habilitado: number,
        uuid: string
    ): Promise<string|null>
}