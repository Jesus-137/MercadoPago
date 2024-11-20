import express from "express";
import { getByuuidController, createController, deleteController, updateController, getAllController } from "./dependencies";
import { publicacionesRouter } from "../../Publicaciones/insfrastructure/CatalogoRouter";

export const clientesRouter = express.Router();

clientesRouter.get(
  '/',
  getAllController.run.bind(getAllController)
);
clientesRouter.get(
  "/:uuid",
  getByuuidController.run.bind(getByuuidController)
);
clientesRouter.post(
  '/',
  createController.run.bind(createController)
);
clientesRouter.delete(
  '/:uuid',
  deleteController.run.bind(deleteController)
);
clientesRouter.put(
  '/:uuid',
  updateController.run.bind(updateController)
);
clientesRouter.use(
  '/:uuid/publicaciones',
  publicacionesRouter
);
