export class Usuarios {
  constructor(
    readonly id: number,
    readonly uuid: string,
    readonly nombre: string,
    readonly password: string,
    readonly telefono: string
  ) {}
}
