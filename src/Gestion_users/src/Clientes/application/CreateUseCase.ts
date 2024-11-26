import { Clientes } from "../domain/Clientes";
import { Repository } from "../domain/Repository";
import { v4 as uuidv4 } from 'uuid';

export class CreateUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    id_lead: number,
    nombre: string,
    password: string,
    tipo: string,
    generos: string,
    ubicacion: string,
    tipo_evento: string
  ): Promise<Clientes | string> {
    try {
      const MyUUID = uuidv4()
      const result = await this.movimientoRepo.create(
        MyUUID,
        id_lead,
        nombre,
        password,
        tipo,
        generos,
        ubicacion,
        tipo_evento
      );
      return result;
    } catch (error) {
      return String(error);
    }
  }
}
