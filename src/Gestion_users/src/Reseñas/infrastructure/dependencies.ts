import { MysqlReseñasRepository } from './adaptadores/MysqlClientesRepository';

import { CreateUseCase } from '../application/CreateUseCase'; 
import { UpdateUseCase } from '../application/UpdateUseCase';

import { CreateClienteController } from './controllers/CreateController';
import { UpdateController } from './controllers/UpdateController';

const mysqlRepository = new MysqlReseñasRepository()

const createUseCase = new CreateUseCase(mysqlRepository)
const updateUsecase = new UpdateUseCase(mysqlRepository);

const createClienteController = new CreateClienteController(createUseCase);
const updateController = new UpdateController(updateUsecase);

export {
  createClienteController,
  updateController,
};
