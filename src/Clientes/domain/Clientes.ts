export class Clientes {
  constructor(
    readonly uuid: string,
    readonly nombre: string,
    readonly tipo: string,
    readonly password: string,
    readonly telefono: string
  ) {}
}
