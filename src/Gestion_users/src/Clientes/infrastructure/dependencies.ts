// src/Clientes/infrastructure/dependencies.ts

import { MysqlClientesRepository } from './adaptadores/MysqlClientesRepository';
import { GetByuuidUseCase } from '../application/GetuuidUseCase';
import { CreateUseCase } from '../application/CreateUseCase';
import { DeleteUseCase } from '../application/DeleteUseCase';
import { UpdateUseCase } from '../application/UpdateUseCase';
import { GetAllUseCase } from '../application/GetAllUseCase';

import { GetByuuidController } from './controllers/GetByuuidController';
import { CreateController } from './controllers/CreateController';
import { DeleteController } from './controllers/DeleteController';
import { UpdateController } from './controllers/UpdateController';
import { GetAllController } from './controllers/GetAllController';

const mysqlClientesRepository = new MysqlClientesRepository()

const getByuuidUseCase = new GetByuuidUseCase(mysqlClientesRepository);
const createUseCase = new CreateUseCase(mysqlClientesRepository);
const deleteUseCase = new DeleteUseCase(mysqlClientesRepository);
const updateUsecase = new UpdateUseCase(mysqlClientesRepository);
const getAllUseCase = new GetAllUseCase(mysqlClientesRepository);

const getByuuidController = new GetByuuidController(getByuuidUseCase);
const createController = new CreateController(createUseCase);
const deleteController = new DeleteController(deleteUseCase);
const updateController = new UpdateController(updateUsecase);
const getAllController = new GetAllController(getAllUseCase);

export {
  getByuuidController,
  createController,
  deleteController,
  updateController,
  getAllController
};
