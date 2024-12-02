// src/Clientes/infrastructure/ClientesRouter.ts

import express from "express";
import multer from 'multer';
import { createClienteController } from "./dependencies";
import { getAllClientesController } from "./dependencies";
import { getByuuidController, uploadController, getByDayController } from "./dependencies";

const upload = multer({ storage: multer.memoryStorage() });
export const publicacionesRouter = express.Router();

publicacionesRouter.get(
  "/",
  getAllClientesController.run.bind(getAllClientesController)
);
publicacionesRouter.get(
  '/dia',
  getByDayController.run.bind(getByDayController)
);
publicacionesRouter.get(
  "/:uuid",
  getByuuidController.run.bind(getByuuidController)
);
publicacionesRouter.post(
  "/",
  createClienteController.run.bind(createClienteController)
);
publicacionesRouter.post(
  '/upload', 
  upload.single('file'), 
  (req, res) => uploadController.handle(req, res));
