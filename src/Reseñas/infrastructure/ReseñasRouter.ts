import express from "express";
import { createClienteController, updateController } from "./dependencies";

export const reseñasRouter = express.Router();

reseñasRouter.post(
  "/",
  createClienteController.run.bind(createClienteController)
);
reseñasRouter.put(
  "/",
  updateController.run.bind(updateController)
);
