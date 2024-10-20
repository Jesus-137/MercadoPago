import { Pagos } from "../domain/Pagos";
import { Repository } from "../domain/Repository";

export class CreatePagoUseCase {
    constructor(readonly repo: Repository){}
    async run (
        cantidad: number,
        url: string
    ): Promise<Pagos|null>{
        try {
            const pago = await this.repo.createPago(cantidad, url);
            return pago
        } catch (error) {
            return null
        }
    }
}