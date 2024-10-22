import { MySqlRepo } from "./adaptadores/MySqlRepo";

import { CrearTokenUseCase } from "../aplication/CrearTokenUseCase";
import { CrearUseCase } from "../aplication/CrearUseCase";
import { VerificarUseCase } from "../aplication/VerificarUseCase";

import { CrearTokenController } from "./controller/CrearTokenController";
import { CrearController } from "./controller/CrearController";
import { VerificarController } from "./controller/VerificarController";

const mysqlRepo = new MySqlRepo();

const crearTokenUseCase = new CrearTokenUseCase(mysqlRepo);
const crearUseCase = new CrearUseCase(mysqlRepo);
const verificarUseCase = new VerificarUseCase(mysqlRepo);

const crearTokenController = new CrearTokenController(crearTokenUseCase);
const crearController = new CrearController(crearUseCase);
const verificarController = new VerificarController(verificarUseCase);

export{
    crearTokenController,
    crearController,
    verificarController
}