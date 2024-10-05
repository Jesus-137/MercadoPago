import express from "express";
import { createClienteController } from "./dependencies";
import { getAllClientesController } from "./dependencies";
import { deleteController } from "./dependencies";
import { updateController } from "./dependencies";
import { historialRouter } from "../../Historial/insfrastructure/historialRouter";
import { reseñasRouter } from "../../Reseñas/infrastructure/ReseñasRouter";

export const  usuariosRouter = express.Router();

usuariosRouter.get(
  "/:uuid",
  getAllClientesController.run.bind(getAllClientesController)
);
usuariosRouter.delete(
  "/:uuid",
  deleteController.run.bind(deleteController)
);
usuariosRouter.post(
  "/",
  createClienteController.run.bind(createClienteController)
);
usuariosRouter.put(
  "/:uuid",
  updateController.run.bind(updateController)
);
usuariosRouter.use(
  '/:uuid/historial',
  historialRouter
);
usuariosRouter.use(
  '/:uuid/resenas',
  reseñasRouter
);