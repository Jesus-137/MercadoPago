import { Repository } from "../domain/Repository";

export class VerificarUseCase{
    constructor(private repo: Repository){}

    async run (token: string, tipo: string): Promise<string|null>{
        try {
            const respuesta = await this.repo.verificar(
                token,
                tipo
            );
            return respuesta;
        } catch (error) {
            return null;
        }
    }
}