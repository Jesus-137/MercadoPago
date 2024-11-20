import { Tokens } from "../domain/Tokens";
import { Repository } from "../domain/Repository";
import { v4 as uuidv4 } from "uuid";

export class CrearUseCase{
    constructor(private repo: Repository){}

    async run (
        token: string,
        habilitado: boolean
    ): Promise<Tokens|null>{
        try {
            const UUID = uuidv4()
            const respuesta = await this.repo.crear(
                UUID,
                token,
                habilitado
            );
            return respuesta
        } catch (error) {
            return null
        }
    }
}