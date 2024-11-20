import express from 'express';

import { mandarCorreoController } from './dependencias';

export const correoRouter = express.Router();

correoRouter.post(
    '/',
    mandarCorreoController.handle.bind(mandarCorreoController)
);