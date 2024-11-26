import express from 'express';
import { crearController } from './dependencias';

export const leadsRouter = express()

leadsRouter.post(
    '/',
    crearController.run.bind(crearController)
)