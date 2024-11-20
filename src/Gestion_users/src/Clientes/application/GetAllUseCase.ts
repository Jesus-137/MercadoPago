import { Clientes } from "../domain/Clientes";
import { Repository } from "../domain/Repository";

export class GetAllUseCase{
    constructor(private repo: Repository){}

    async run (): Promise<Clientes[]|null>{
        try {
            const clientes = await this.repo.getAll();
            console.log(clientes)
            return clientes
        } catch (error) {
            return null            
        }
    }
}