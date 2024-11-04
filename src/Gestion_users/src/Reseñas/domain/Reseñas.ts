export class Reseñas {
    constructor(
        readonly uuid: string,
        readonly id_usuario: number,
        readonly id_publicacion: number,
        readonly comentario: string,
        readonly estrellas: number,
    ){}
}
  