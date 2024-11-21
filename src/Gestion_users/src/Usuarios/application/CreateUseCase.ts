import { Usuarios } from "../domain/Usuarios";
import { Repository } from "../domain/Repository";
import { v4 as uuidv4 } from 'uuid';

export class CreateClientesUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    nombre: string,
    password: string,
    telefono: string,
    correo: string
  ): Promise<Usuarios | string> {
    try {
      const MyUUID = uuidv4();
      const cliente = await this.movimientoRepo.create(
        MyUUID,
        nombre,
        password,
        telefono,
        correo
      );
      return cliente;
    } catch (error) {
      return String(error);
    }
  }
}
