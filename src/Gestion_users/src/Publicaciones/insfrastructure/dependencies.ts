// src/Clientes/infrastructure/dependencies.ts

import { MysqlRepository } from './adaptadores/MysqlRepository';

import { CreateUseCase } from '../application/CreateUseCase'; 
import { GetAllUseCase } from '../application/GetAllUseCase'; 
import { GetByuuidUseCase } from '../application/GetByuuidUseCase';

import { CreateController } from './controllers/CreateController';
import { GetAllClientesController } from './controllers/GetAllController';
import { GetByuuidController } from './controllers/GetByuuidController';

const mysqlClientesRepository = new MysqlRepository()

const createClienteUseCase = new CreateUseCase(mysqlClientesRepository);
const getAllUseCase = new GetAllUseCase(mysqlClientesRepository);
const getByuuidUseCase = new GetByuuidUseCase(mysqlClientesRepository);

const createClienteController = new CreateController(createClienteUseCase);
const getAllClientesController = new GetAllClientesController(getAllUseCase);
const getByuuidController = new GetByuuidController(getByuuidUseCase);

export {
  createClienteController,
  getAllClientesController,
  getByuuidController,
};
