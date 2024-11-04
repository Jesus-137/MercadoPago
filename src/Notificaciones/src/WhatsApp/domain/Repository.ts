import { WhatsApp } from "./WhatsApp";

export interface Repository{
    mandarMensaje(telefono:string): Promise<WhatsApp|null>
}