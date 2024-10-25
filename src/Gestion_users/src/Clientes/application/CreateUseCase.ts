import { Clientes } from "../domain/Clientes";
import { Repository } from "../domain/Repository";
import { v4 as uuidv4 } from 'uuid';

export class CreateUseCase {
  constructor(readonly movimientoRepo: Repository) {}

  async run(
    nombre: string,
    password: string,
    tipo: string,
    phone: string
  ): Promise<Clientes | null> {
    try {
      const MyUUID = uuidv4()
      const result = await this.movimientoRepo.create(
        MyUUID,
        nombre,
        password,
        tipo,
        phone
      );
      console.log(result);
      return result;
    } catch (error) {
      return null;
    }
  }
}
