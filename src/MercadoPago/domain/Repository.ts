import { Pagos } from "./Pagos";

export interface Repository{
    createPago(
        cantidad: number,
        url: string
    ): Promise<Pagos|null>;
}