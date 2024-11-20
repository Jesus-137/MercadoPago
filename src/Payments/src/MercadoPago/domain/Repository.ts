import { Pagos } from "./Pagos";

export interface Repository{
    createPago(
        uuid: string,
        cantidad: number,
        url: string
    ): Promise<Pagos|null>;
}