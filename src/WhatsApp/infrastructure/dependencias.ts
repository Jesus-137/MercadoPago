import { TwilioRepository } from "./adaptadores/TwilioRepository";

import { MandarMensajeUseCase } from "../aplication/MandarMensajeUseCase";

import { MandarMensajeController } from "./controller/MandarMensajeController";

const twilioRepository = new TwilioRepository();

const mandarMensajeUseCase = new MandarMensajeUseCase(twilioRepository);

export const mandarMensajeController = new MandarMensajeController(mandarMensajeUseCase);