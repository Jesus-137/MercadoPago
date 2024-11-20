import { EmailService } from "./adaptadores/Coreos";

import { MandarCorreoUseCase } from "../application/MandarCorreoUseCase";

import { MandarCorreoController } from "./controller/MandarCorreoController";

const emailService = new EmailService();

const mandarCorreoUseCase = new MandarCorreoUseCase(emailService);

const mandarCorreoController = new MandarCorreoController(mandarCorreoUseCase);

export{
    mandarCorreoController
}