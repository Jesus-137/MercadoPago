// src/Clientes/infrastructure/dependencies.ts

import { MysqlUsuariosRepository } from './adaptadores/MysqlUsuariosRepository';

import { CreateClientesUseCase } from '../application/CreateUseCase'; 
import { GetAllClientesUseCase } from '../application/GetByuuidUseCase'; 
import { DeleteUseCase } from '../application/DeleteUseCase'; 
import { UpdateClientesUseCase } from '../application/UpdateUseCase';
import { GetAllUseCase } from '../application/GetAllUseCase';

import { CreateClienteController } from './controllers/CreateController';
import { GetAllClientesController } from './controllers/GetByuuidController';
import { DeleteController } from './controllers/DeleteController';
import { UpdateController } from './controllers/UpdateController';
import { GetAllController } from './controllers/GetAllController';

const mysqlClientesRepository = new MysqlUsuariosRepository()

const createClienteUseCase = new CreateClientesUseCase(mysqlClientesRepository);
const getByuuidUseCase = new GetAllClientesUseCase(mysqlClientesRepository);
const deleteUseCase = new DeleteUseCase(mysqlClientesRepository);
const updateUsecase = new UpdateClientesUseCase(mysqlClientesRepository);
const getAllUseCase = new GetAllUseCase(mysqlClientesRepository)

const createClienteController = new CreateClienteController(createClienteUseCase);
const getByuuidController = new GetAllClientesController(getByuuidUseCase);
const deleteController = new DeleteController(deleteUseCase);
const updateController = new UpdateController(updateUsecase);
const getAllController = new GetAllController(getAllUseCase);

export {
  createClienteController,
  getByuuidController,
  deleteController,
  updateController,
  getAllController
};
