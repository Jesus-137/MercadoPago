import express from "express";
import { createClienteController, getAllController } from "./dependencies";
import { getByuuidController } from "./dependencies";
import { deleteController } from "./dependencies";
import { updateController } from "./dependencies";
import { historialRouter } from "../../Historial/insfrastructure/historialRouter";
import { reseñasRouter } from "../../Reseñas/infrastructure/ReseñasRouter";

export const  usuariosRouter = express.Router();

usuariosRouter.get(
  "/:uuid",
  getByuuidController.run.bind(getByuuidController)
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
usuariosRouter.get(
  '/',
  getAllController.run.bind(getAllController)
)
usuariosRouter.use(
  '/:uuid/historial',
  historialRouter
);
usuariosRouter.use(
  '/:uuid/resenas',
  reseñasRouter
);