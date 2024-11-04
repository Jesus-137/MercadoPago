import { WhatsApp } from "../domain/WhatsApp";
import { Repository } from "../domain/Repository";

export class MandarMensajeUseCase{
    constructor(private repo: Repository){}

    async run (telefono:string): Promise<WhatsApp|null>{
        try {
            const WhatsApp = await this.repo.mandarMensaje(telefono)
            return WhatsApp;
        } catch (error) {
            return null;            
        }
    }
}