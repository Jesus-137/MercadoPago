import express from 'express'
import { 
    getAllController,
    getByuuidController,
    crearController,
} 
from "./dependencias";

export const auditoriaRouter = express.Router();

auditoriaRouter.get(
    '/',
    getAllController.run.bind(getAllController)
);
auditoriaRouter.get(
    '/:uuid',
    getByuuidController.run.bind(getByuuidController)
);
auditoriaRouter.post(
    '/',
    crearController.run.bind(crearController)
);