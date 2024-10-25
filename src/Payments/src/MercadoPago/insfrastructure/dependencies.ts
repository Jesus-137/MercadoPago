import { MercadoRepo } from "./adaptadores/MeradoRepo";
import { CreatePagoUseCase } from "../aplication/CreatePagoUseCase";
import { CreatePagoController } from "./Controllers/CreatePagoController";

const mercadoRepo = new MercadoRepo()
const createPagoUseCase = new CreatePagoUseCase(mercadoRepo);
const createPagoController = new CreatePagoController(createPagoUseCase);

export{
    createPagoController
}