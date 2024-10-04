// src/Clientes/infrastructure/dependencies.ts

import { MysqlUsuariosRepository } from './adaptadores/MysqlUsuariosRepository';

import { CreateClientesUseCase } from '../application/CreateUseCase'; 
import { GetAllClientesUseCase } from '../application/GetAllUseCase'; 
import { DeleteUseCase } from '../application/DeleteUseCase'; 
import { UpdateClientesUseCase } from '../application/UpdateUseCase';

import { CreateClienteController } from './controllers/CreateController';
import { GetAllClientesController } from './controllers/GetAllController';
import { DeleteController } from './controllers/DeleteController';
import { UpdateController } from './controllers/UpdateController';

const mysqlClientesRepository = new MysqlUsuariosRepository()

const createClienteUseCase = new CreateClientesUseCase(mysqlClientesRepository);
const getAllUseCase = new GetAllClientesUseCase(mysqlClientesRepository);
const deleteUseCase = new DeleteUseCase(mysqlClientesRepository);
const updateUsecase = new UpdateClientesUseCase(mysqlClientesRepository);

const createClienteController = new CreateClienteController(createClienteUseCase);
const getAllClientesController = new GetAllClientesController(getAllUseCase);
const deleteController = new DeleteController(deleteUseCase);
const updateController = new UpdateController(updateUsecase);

export {
  createClienteController,
  getAllClientesController,
  deleteController,
  updateController,
};
