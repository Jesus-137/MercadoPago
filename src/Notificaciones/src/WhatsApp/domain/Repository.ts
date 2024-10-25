import { WhatsApp } from "./WhatsApp";

export interface Repository{
    mandarMensaje(telefono:number): Promise<WhatsApp|null>
}