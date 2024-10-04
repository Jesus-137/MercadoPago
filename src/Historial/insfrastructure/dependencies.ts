// src/Clientes/infrastructure/dependencies.ts

import { MysqlRepository } from './adaptadores/MysqlRepository';

import { UpdateUseCase } from '../application/UpdateUseCase'; 
import { GetAllUseCase } from '../application/GetAllUseCase';

import { UpdateController } from './controllers/UpdateController';
import { GetAllClientesController } from './controllers/GetAllController';

const mysqlClientesRepository = new MysqlRepository()

const updateClienteUseCase = new UpdateUseCase(mysqlClientesRepository);
const getAllUseCase = new GetAllUseCase(mysqlClientesRepository);

const updateController = new UpdateController(updateClienteUseCase);
const getAllController = new GetAllClientesController(getAllUseCase);

export {
  updateController,
  getAllController
};
