import { Repository } from "../../domain/Repository";
import { Pagos } from "../../domain/Pagos";
import dotenv from 'dotenv';

export class MercadoRepo implements Repository {
    async createPago(cantidad: number, url: string): Promise<Pagos|null>{
        dotenv.config()
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${process.env.Access_Token}`);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            reason: 'artistas',
            auto_recurring: {
                "frequency": 1,
                "frequency_type": "months",
                "repetitions": 12,
                "billing_day_proportional": false,
                "transaction_amount": cantidad,
                "currency_id": "MXN"
            },
            back_url: url
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const pago = await fetch("https://api.mercadopago.com/preapproval_plan", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                return new Pagos (
                    JSON.parse(result).id,
                    JSON.parse(result).init_point
            )})
            .catch((error) => {
                console.log(error)
                return null
            });
        return pago
    }
}