import { Request, Response } from 'express';
import twilio from 'twilio';

export class SendSMS{
    constructor(){}
    async run(req: Request, res: Response){
        const telefono = req.body.telefono
        const accountSid = process.env.Account_SID; // Tu Account SID
        const authToken = process.env.Auth_Token; // Tu Auth Token
        const client = twilio(accountSid, authToken);

        const code = Math.floor(1000 + Math.random() * 9000);
        console.log(code)

        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
                contentVariables: `{"1":"${code}"}`,
                to: `whatsapp:+521${telefono}`
            })
            .then(message => res.status(200).send(message.sid))
            .catch(error => res.status(400).send({Error: error}));
    }
}