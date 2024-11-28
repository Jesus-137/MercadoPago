export class Publicaciones {
    constructor(
      readonly id: number,
      readonly uuid: string,
      readonly titulo: string,
      readonly descripcion: string,
      readonly contenido: string,
      readonly id_cliente: number
    ) {}
  }
  