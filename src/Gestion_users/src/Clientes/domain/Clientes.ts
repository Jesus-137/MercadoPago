export class Clientes {
  constructor(
    readonly uuid: string,
    readonly id_lead: number,
    readonly foto_perfil: string,
    readonly nombre: string,
    readonly password: string,
    readonly tipo: string,
    readonly genero_musical: string,
    readonly tipo_evento: string,
    readonly ubicacion: string
  ) {}
}
