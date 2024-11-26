import { MySqlRepo } from "./adaptadores/MySqlRepo";

import { CrearUseCase } from "../aplication/CrearUseCase";

import { CrearController } from "./controller/CrearController";

const mysqlRepo = new MySqlRepo();

const crearUseCase = new CrearUseCase(mysqlRepo);

const crearController = new CrearController(crearUseCase);

export{
    crearController,
}