import { Usuarios } from "../domain/Usuarios";
import { Repository } from "../domain/Repository";

export class GetAllUseCase{
    constructor(readonly repo: Repository){}
    
    async run(): Promise<Usuarios[]|null>{
        try {
            const usuarios = await this.repo.getAll();
            return usuarios;
        } catch (error) {
            return null;            
        }
    }
}