import { WhatsApp } from "./WhatsApp";

export interface Repository{
    mandarMensaje(
        uuid: string,
        telefono: string
    ): Promise<WhatsApp|null>
}