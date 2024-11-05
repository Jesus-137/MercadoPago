import { Pagos } from "./Pagos";

export interface Repository{
    createPago(
        uuid: string,
        token: string,
        cantidad: number,
        url: string
    ): Promise<Pagos|null>;
}