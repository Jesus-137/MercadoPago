import { MySQL } from "./adaptadores/msyql";

import { GetAllUseCase } from "../aplication/GetAllUseCase";
import { CrearUseCase } from "../aplication/CrearUseCase";
import { UpdateUseCase } from "../aplication/UpdateUseCase";

import { GetAllController } from "./controller/GetAllController";
import { CrearController } from "./controller/CrearController";
import { UpdateController } from "./controller/UpdateController";

const mysql = new MySQL();

const getAllUseCase = new GetAllUseCase(mysql);
const crearUseCase = new CrearUseCase(mysql);
const updateUseCase = new UpdateUseCase(mysql);

const getAllController =new GetAllController(getAllUseCase);
const crearController = new CrearController(crearUseCase);
const updateController = new UpdateController(updateUseCase);

export{
    getAllController,
    crearController,
    updateController
}