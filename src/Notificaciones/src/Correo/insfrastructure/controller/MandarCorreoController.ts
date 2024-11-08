import { Request, Response } from 'express';
import { MandarCorreoUseCase } from '../../application/MandarCorreoUseCase'; 
import { consumeMessages } from '../../../../../Rabbit/ConsumeUseCase';

export class MandarCorreoController {
    constructor(private mandarCorreoUseCase: MandarCorreoUseCase) {
        consumeMessages('correo', async (msg)=>{
            const data = JSON.parse(msg);
            await mandarCorreoUseCase.execute(data.correo, 'Gracias por la preferencia', 
                'Bienvenido a nuestra red social ¿Listo para empesar a buscar a su entretenimiento musical para sus futuros eventos?')
        })
    }

    async handle(req: Request, res: Response): Promise<Response> {
        const { to, subject, message } = req.body;

        try {
            await this.mandarCorreoUseCase.execute(to, subject, message);
            return res.status(200).json({ message: 'Correo enviado exitosamente' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al enviar correo' });
        }
    }
}
