// src/Clientes/infrastructure/ClientesRouter.ts

import express from "express";
import { updateController } from "./dependencies";
import { getAllController } from "./dependencies";

export const historialRouter = express.Router();

historialRouter.get(
  "/",
  getAllController.run.bind(getAllController)
);
historialRouter.put(
  "/:uuid",
  updateController.run.bind(updateController)
);
