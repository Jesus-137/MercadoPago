import { Usuarios } from "../domain/Usuarios";
import { Repository } from "../domain/Repository";
import { v4 as uuidv4 } from 'uuid';

export class CreateClientesUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    nombre: string,
    password: string,
    telefono: string
  ): Promise<Usuarios | null> {
    try {
      const MyUUID = uuidv4();
      const cliente = await this.movimientoRepo.create(
        MyUUID,
        nombre,
        password,
        telefono
      );
      return cliente;
    } catch (error) {
      return null;
    }
  }
}
