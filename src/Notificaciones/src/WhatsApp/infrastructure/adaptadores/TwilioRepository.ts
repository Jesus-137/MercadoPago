import twilio from 'twilio';
import dotenv from 'dotenv';
import { WhatsApp } from '../../domain/WhatsApp';
import { Repository } from '../../domain/Repository';
import { query } from '../../../database/mysql';


export class TwilioRepository implements Repository{
    async mandarMensaje(
        uuid: string,
        uuid_user: string, 
        telefono: string): Promise<WhatsApp | null> {
        dotenv.config();
        try {
            const accountSid = process.env.Account_SID; // Tu Account SID
            const authToken = process.env.Auth_Token; // Tu Auth Token
            console.log(accountSid, authToken);
            const client = twilio(accountSid, authToken);
            
            const code =Math.floor(1000 + Math.random() * 9000);
            console.log(code)
            
            const whatsapp = await client.messages.create({
                from: 'whatsapp:+14155238886',
                contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
                contentVariables: `{"1":"${code}"}`,
                to: `whatsapp:+521${telefono}`
            })
            .then(message => {
                const sql = 'INSERT INTO mensajes (uuid, id_user, telefono, codigo) VALUES (?, ?, ?, ?);';
                const params: any[] = [uuid, uuid_user, telefono, code]
                try {
                    const [whatsapp]: any = query(sql, params);
                    console.log(whatsapp.insertid);
                    return new WhatsApp(uuid, uuid_user, telefono, code)
                } catch (error) {
                    console.log(error)
                    return null
                }
            })
            .catch(error => {
                console.log(error)
                return null
            });
            if(whatsapp){
                return whatsapp;
            }else
                return null;
        } catch (error) {
            console.log(error);
            return null;            
        }
    }
}