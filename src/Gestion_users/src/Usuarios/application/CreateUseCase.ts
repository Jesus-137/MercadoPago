import { Usuarios } from "../domain/Usuarios";
import { Repository } from "../domain/Repository";
import { v4 as uuidv4 } from 'uuid';

export class CreateClientesUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    id_lead: number,
    nombre: string,
    password: string
  ): Promise<Usuarios | string> {
    try {
      const MyUUID = uuidv4();
      const cliente = await this.movimientoRepo.create(
        MyUUID,
        id_lead,
        nombre,
        password
      );
      return cliente;
    } catch (error) {
      return String(error);
    }
  }
}
