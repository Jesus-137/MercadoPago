import { MysqlReseñasRepository } from './adaptadores/MysqlClientesRepository';

import { CreateUseCase } from '../application/CreateUseCase'; 
import { UpdateUseCase } from '../application/UpdateUseCase';
import { GetAllUseCase } from '../application/GetAllUseCase';

import { CreateClienteController } from './controllers/CreateController';
import { UpdateController } from './controllers/UpdateController';
import { GetAllController } from './controllers/GetAllController';

const mysqlRepository = new MysqlReseñasRepository()

const createUseCase = new CreateUseCase(mysqlRepository)
const updateUsecase = new UpdateUseCase(mysqlRepository);
const getAllUseCase = new GetAllUseCase(mysqlRepository);

const createClienteController = new CreateClienteController(createUseCase);
const updateController = new UpdateController(updateUsecase);
const getAllController = new GetAllController(getAllUseCase);

export {
  createClienteController,
  updateController,
  getAllController
};
