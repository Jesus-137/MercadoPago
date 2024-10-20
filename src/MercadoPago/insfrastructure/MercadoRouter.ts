import express from 'express';
import { createPagoController } from './dependencies';

export const mercadoRouter = express.Router()

mercadoRouter.post(
    '/',
    createPagoController.run.bind(createPagoController)
)