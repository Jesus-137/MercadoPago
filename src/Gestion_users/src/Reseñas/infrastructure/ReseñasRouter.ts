import express from "express";
import { createClienteController, updateController, getAllController } from "./dependencies";

export const reseñasRouter = express.Router();

reseñasRouter.post(
  "/",
  createClienteController.run.bind(createClienteController)
);
reseñasRouter.put(
  "/:uuid_resenas",
  updateController.run.bind(updateController)
);
reseñasRouter.get(
  '/',
  getAllController.run.bind(getAllController)
);
