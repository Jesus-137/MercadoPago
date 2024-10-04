import express from 'express';
import { Pago } from './Pago';

export const mercadoRouter = express.Router()
const pago = new Pago()

mercadoRouter.post(
    '/',
    pago.run.bind(pago)
)