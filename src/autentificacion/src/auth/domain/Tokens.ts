export class Tokens{
    constructor(
        readonly id: number,
        readonly uuid: string,
        readonly token: string,
        readonly habilitado: number,
        readonly creacion: string | null,
        readonly actualizacion: string | null
    ){}
}