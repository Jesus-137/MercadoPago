import express from 'express';
import { mandarMensajeController } from './dependencias';

export const whatsAppRouter = express.Router();

whatsAppRouter.post(
    '/:uuid',
    mandarMensajeController.run.bind(mandarMensajeController)
)