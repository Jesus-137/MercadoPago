import { LeadsUser } from "./LeadsUser";

export interface Repository{
    crear(
        uuid: string,
        username: string,
        telefono: string,
        correo: string
    ): Promise<LeadsUser|string>;
}