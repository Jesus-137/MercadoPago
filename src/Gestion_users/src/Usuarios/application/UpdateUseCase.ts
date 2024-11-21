import { Usuarios } from "../domain/Usuarios"; 
import { Repository } from "../domain/Repository";

export class UpdateClientesUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    uuid: string,
    nombre: string,
    password: string,
    telefono: string,
    correo: string
  ): Promise<Usuarios | string> {
    try {
      const result = await this.movimientoRepo.update(
        uuid,
        nombre,
        password,
        telefono,
        correo
      );
      console.log(result);
      return result;
    } catch (error) {
      return String(error);
    }
  }
}
