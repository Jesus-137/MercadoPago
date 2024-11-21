import express from 'express';
import { getAllController, crearController, updateController } from './dependencias';

export const RouterTokens = express.Router()

RouterTokens.post(
    '/',
    crearController.run.bind(crearController)
);
RouterTokens.get(
    '/',
    getAllController.run.bind(getAllController)
);
RouterTokens.put(
    '/',
    updateController.run.bind(updateController)
);