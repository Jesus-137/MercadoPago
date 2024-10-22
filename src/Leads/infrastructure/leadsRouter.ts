import express from 'express';
import { crearController, crearTokenController, verificarController } from './dependencias';

export const leadsRouter = express()

leadsRouter.post(
    '/',
    crearController.run.bind(crearController)
)
leadsRouter.post(
    '/token',
    crearTokenController.run.bind(crearTokenController)
)
leadsRouter.post(
    '/verificar',
    verificarController.run.bind(verificarController)
)