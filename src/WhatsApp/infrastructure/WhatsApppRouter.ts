import express from 'express';
import { mandarMensajeController } from './dependencias';

export const whatsAppRouter = express.Router();

whatsAppRouter.post(
    '/',
    mandarMensajeController.run.bind(mandarMensajeController)
)