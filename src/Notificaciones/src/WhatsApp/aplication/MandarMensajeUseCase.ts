import { WhatsApp } from "../domain/WhatsApp";
import { Repository } from "../domain/Repository";
import { v4 as uuidv4 } from "uuid";

export class MandarMensajeUseCase{
    constructor(private repo: Repository){}

    async run (uuid: string, telefono:string): Promise<WhatsApp|null>{
        try {
            const myuuid= uuidv4()
            const WhatsApp = await this.repo.mandarMensaje(myuuid, uuid, telefono)
            return WhatsApp;
        } catch (error) {
            return null;
        }
    }
}