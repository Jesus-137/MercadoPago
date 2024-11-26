import { LeadsUser } from "../domain/LeadsUser";
import { Repository } from "../domain/Repository";
import { v4 as uuidv4 } from "uuid";

export class CrearUseCase{
    constructor(readonly repo: Repository){}

    async run (
        username: string,
        telefono: string,
        correo: string
    ): Promise<LeadsUser|string>{
        try {
            const uuid = uuidv4();
            const leads = await this.repo.crear(
                uuid,
                username,
                telefono,
                correo
            );
            return leads;
        } catch (error) {
            return String(error);
        }
    }
}