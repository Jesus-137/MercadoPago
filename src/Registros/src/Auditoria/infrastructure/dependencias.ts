import { MongoRepo } from "./adapdatores/MongoRepo";

import { GetAllUseCase } from "../aplication/GetAllUseCase";
import { GetByuuidUseCase } from "../aplication/GetByuuidUseCase";
import { CrearUseCase } from "../aplication/CrearUseCase";

import { GetAllController } from "./controller/GetAllController";
import { GetByuuidController } from "./controller/GetByuuidController";
import { CrearController } from "./controller/CrearController";

const mysqlRepo = new MongoRepo();

const getAllUseCase = new GetAllUseCase(mysqlRepo);
const getByuuidUseCase = new GetByuuidUseCase(mysqlRepo);
const crearUseCase = new CrearUseCase(mysqlRepo);

const getAllController = new GetAllController(getAllUseCase);
const getByuuidController = new GetByuuidController(getByuuidUseCase);
const crearController = new CrearController(crearUseCase);

export{
    getAllController,
    getByuuidController,
    crearController,
}