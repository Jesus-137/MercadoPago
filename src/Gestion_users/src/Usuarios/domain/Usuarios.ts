export class Usuarios {
  constructor(
    readonly uuid: string,
    readonly nombre: string,
    readonly password: string,
    readonly telefono: string
  ) {}
}
