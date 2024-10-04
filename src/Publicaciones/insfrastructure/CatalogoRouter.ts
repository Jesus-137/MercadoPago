// src/Clientes/infrastructure/ClientesRouter.ts

import express from "express";
import { createClienteController } from "./dependencies";
import { getAllClientesController } from "./dependencies";
import { getByuuidController } from "./dependencies";
import { reseñasRouter } from "../../Reseñas/infrastructure/ReseñasRouter";

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
publicacionesRouter.use(
  '/reseñas',
  reseñasRouter
)
