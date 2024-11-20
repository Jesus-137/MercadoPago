import { WhatsApp } from "./WhatsApp";

export interface Repository{
    mandarMensaje(
        uuid: string,
        uuid_user: string,
        telefono: string
    ): Promise<WhatsApp|null>
}