export class Auditoria{
    constructor(
        readonly uuid: string,
        readonly tarjet: string,
        readonly accion: string,
        readonly tipo: string,
        readonly fecha_creacion: string|null,
    ){}
}