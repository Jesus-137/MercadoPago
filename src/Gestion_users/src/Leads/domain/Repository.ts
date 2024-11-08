import { LeadsUser } from "./LeadsUser";

export interface Repository{
    crear(
        uuid: string,
        username: string,
        nombre: string,
        telefono: string,
        sendBy: string
    ): Promise<LeadsUser|null>
    verificar(
        token: string,
        tipo: string
    ): Promise<string|null>
    crearToken(
        uuid: string,
        username: string,
        nombre: string,
        telefono: string
    ): Promise<string|null>
    crearTokenByid(
        uuid: string
    ):Promise<string|null>
}