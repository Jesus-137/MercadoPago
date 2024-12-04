import { Request, Response } from 'express';
import { MandarCorreoUseCase } from '../../application/MandarCorreoUseCase'; 
import { consumeMessages } from '../../../../../Rabbit/ConsumeUseCase';
import { produceMessage } from '../../../../../Rabbit/SendEventUseCase';

export class MandarCorreoController {
    constructor(private mandarCorreoUseCase: MandarCorreoUseCase) {
        consumeMessages('notificacion', async (msg)=>{
            const data = JSON.parse(msg);
            if(data.sendBy=='correo'){
                if(data.msg!=''){
                    await mandarCorreoUseCase.execute(data.correo, 'Gracias por la preferencia', 
                        data.msg)
                }else{
                    console.log("hola")
                    await mandarCorreoUseCase.execute(data.correo, 'Gracias por la preferencia', 
                        'Bienvenido a nuestra red social ¿Listo para empesar a buscar a su entretenimiento musical para sus futuros eventos?')
                }
            }
        })
    }

    async handle(req: Request, res: Response): Promise<Response> {
        const { to, subject, message } = req.body;

        try {
            await this.mandarCorreoUseCase.execute(to, subject, message);
            return res.status(200).json({ message: 'Correo enviado exitosamente' });
        } catch (error) {
            produceMessage('Error', `{"tarjet": ${to}, "accion": ${String(error)}}`)
            return res.status(500).json({ error: 'Error al enviar correo' });
        }
    }
}
