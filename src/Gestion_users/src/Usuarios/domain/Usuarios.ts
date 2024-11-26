export class Usuarios {
  constructor(
    readonly id: number,
    readonly uuid: string,
    readonly id_lead: number,
    readonly nombre: string,
    readonly password: string
  ) {}
}
