export class Auditoria{
    constructor(
        readonly uuid: string,
        readonly tarjet: string,
        readonly accion: string,
        readonly fecha_creacion: string|null,
    ){}
}