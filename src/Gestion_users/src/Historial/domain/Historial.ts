export class Historial {
    constructor(
      readonly uuid: string,
      readonly fecha_busqueda: string|null,
      readonly id_usuario: number,
      readonly busqueda: string
    ) {}
}
  