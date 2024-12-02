// src/Clientes/infrastructure/dependencies.ts

import { MysqlRepository } from './adaptadores/MysqlRepository';
import { S3MediaUploader } from './adaptadores/S3';

import { CreateUseCase } from '../application/CreateUseCase'; 
import { GetAllUseCase } from '../application/GetAllUseCase'; 
import { GetByuuidUseCase } from '../application/GetByuuidUseCase';
import { UploadMediaUseCase } from '../application/UploadUseCase';
import { GetByDayUseCase } from '../application/GetByDayUseCase';

import { CreateController } from './controllers/CreateController';
import { GetAllClientesController } from './controllers/GetAllController';
import { GetByuuidController } from './controllers/GetByuuidController';
import { UploadMediaController } from './controllers/UploadController';
import { GetByDayController } from './controllers/GetByDayController';

const mysqlClientesRepository = new MysqlRepository();
const s3MediaUploader = new S3MediaUploader();

const createClienteUseCase = new CreateUseCase(mysqlClientesRepository);
const getAllUseCase = new GetAllUseCase(mysqlClientesRepository);
const getByuuidUseCase = new GetByuuidUseCase(mysqlClientesRepository);
const uploadMediaUseCase = new UploadMediaUseCase(s3MediaUploader);
const getByDayUseCase = new GetByDayUseCase(mysqlClientesRepository);

const createClienteController = new CreateController(createClienteUseCase);
const getAllClientesController = new GetAllClientesController(getAllUseCase);
const getByuuidController = new GetByuuidController(getByuuidUseCase);
const uploadController = new UploadMediaController(uploadMediaUseCase);
const getByDayController = new GetByDayController(getByDayUseCase)

export {
  createClienteController,
  getAllClientesController,
  getByuuidController,
  uploadController,
  getByDayController
};
