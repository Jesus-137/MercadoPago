export class Tokens{
    constructor(
        readonly id: number,
        readonly uuid: string,
        readonly token: string,
        readonly habilitado: boolean,
        readonly creacion: string | null,
        readonly actualizacion: string | null
    ){}
}