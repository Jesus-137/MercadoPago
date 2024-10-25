export class Reseñas {
    constructor(
        readonly uuid: string,
        readonly id_usuario: string,
        readonly id_publicacion: string,
        readonly comentario: string,
        readonly estrellas: number,
    ){}
}
  