import { Repository } from "../domain/Repository";

export class CrearTokenUseCase{
    constructor(private repo: Repository){}

    async run (
        uuid: string,
        username: string,
        nombre: string,
        telefono: string
    ): Promise<string|null>{
        try {
            const token = await this.repo.crearToken(
                uuid,
                username,
                nombre,
                telefono
            );
            return token;
        } catch (error) {
            return null;
        }
    }
}