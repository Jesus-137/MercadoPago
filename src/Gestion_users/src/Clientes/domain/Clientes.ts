export class Clientes {
  constructor(
    readonly uuid: string,
    readonly id_lead: string,
    readonly tipo: string,
    readonly password: string,
    readonly genero_musical: string,
    readonly tipo_evento: string,
    readonly ubicacion: string
  ) {}
}
