import { Tokens } from "./Tokens";

export interface Repository{
    crear(
        uuid: string,
        token: string,
        habilitado: boolean
    ): Promise<Tokens|null>
    getAll(): Promise<Tokens[]|null>
    update(
        habilitado: boolean,
        uuid: string
    ): Promise<string|null>
}