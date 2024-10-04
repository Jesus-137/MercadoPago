import { Request, Response } from "express";

export class Pago {
    constructor(){}
    async run(req: Request, res: Response){
        const data = req.body;
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
                "transaction_amount": data.transaction_amount,
                "currency_id": "MXN"
            },
            back_url: data.back_url
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://api.mercadopago.com/preapproval_plan", requestOptions)
            .then((response) => response.text())
            .then((result) => res.status(200).send({
                url:JSON.parse(result).init_point,
                id: JSON.parse(result).id
            }))
            .catch((error) => res.status(200).send(error));
    }
}