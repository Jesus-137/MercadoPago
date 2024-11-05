import { Pagos } from "../domain/Pagos";
import { Repository } from "../domain/Repository";

export class CreatePagoUseCase {
    constructor(readonly repo: Repository){}
    async run (
        uuid: string,
        token: string,
        cantidad: number,
        url: string
    ): Promise<Pagos|null>{
        try {
            const pago = await this.repo.createPago(
                uuid,
                token,
                cantidad,
                url
            );
            return pago
        } catch (error) {
            return null
        }
    }
}