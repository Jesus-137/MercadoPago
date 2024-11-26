// src/Clientes/infrastructure/ClientesRouter.ts

import express from "express";
import multer from 'multer';
import { createClienteController } from "./dependencies";
import { getAllClientesController } from "./dependencies";
import { getByuuidController, uploadController } from "./dependencies";
import { reseñasRouter } from "../../Reseñas/infrastructure/ReseñasRouter";

const upload = multer({ storage: multer.memoryStorage() });
export const publicacionesRouter = express.Router();

publicacionesRouter.get(
  "/",
  getAllClientesController.run.bind(getAllClientesController)
);
publicacionesRouter.get(
  "/:uuid",
  getByuuidController.run.bind(getByuuidController)
);
publicacionesRouter.post(
  "/",
  createClienteController.run.bind(createClienteController)
);
publicacionesRouter.post('/upload', upload.single('file'), (req, res) => uploadController.handle(req, res));
publicacionesRouter.use(
  '/:uuid_resenas/resenas',
  reseñasRouter
)
