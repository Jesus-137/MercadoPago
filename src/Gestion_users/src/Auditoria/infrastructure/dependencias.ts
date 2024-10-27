import { MysqlRepo } from "./adapdatores/MysqlRepo";

import { GetAllUseCase } from "../aplication/GetAllUseCase";
import { GetByuuidUseCase } from "../aplication/GetByuuidUseCase";
import { CrearUseCase } from "../aplication/CrearUseCase";
import { UpdateUseCase } from "../aplication/UpdateUseCase";

import { GetAllController } from "./controller/GetAllController";
import { GetByuuidController } from "./controller/GetByuuidController";
import { CrearController } from "./controller/CrearController";
import { UpdateController } from "./controller/UpdateController";

const mysqlRepo = new MysqlRepo();

const getAllUseCase = new GetAllUseCase(mysqlRepo);
const getByuuidUseCase = new GetByuuidUseCase(mysqlRepo);
const crearUseCase = new CrearUseCase(mysqlRepo);
const updateUseCase = new UpdateUseCase(mysqlRepo);

const getAllController = new GetAllController(getAllUseCase);
const getByuuidController = new GetByuuidController(getByuuidUseCase);
const crearController = new CrearController(crearUseCase);
const updateController = new UpdateController(updateUseCase);

export{
    getAllController,
    getByuuidController,
    crearController,
    updateController
}