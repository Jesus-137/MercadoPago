import { Clientes } from "../domain/Clientes";
import { Repository } from "../domain/Repository";
import { v4 as uuidv4 } from 'uuid';

export class CreateUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    id_lead: string,
    tipo: string,
    password: string,
    generos: string,
    ubicacion: string,
    tipo_evento: string
  ): Promise<Clientes | string> {
    try {
      const MyUUID = uuidv4()
      const result = await this.movimientoRepo.create(
        MyUUID,
        id_lead,
        tipo,
        password,
        generos,
        ubicacion,
        tipo_evento
      );
      console.log(result);
      return result;
    } catch (error) {
      return String(error);
    }
  }
}
