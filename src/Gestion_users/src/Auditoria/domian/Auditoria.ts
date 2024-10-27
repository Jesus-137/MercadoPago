export class Auditoria{
    constructor(
        readonly id: number,
        readonly uuid: string,
        readonly tarjet: string,
        readonly accion: string,
        readonly fecha_creacion: string|null,
        readonly ultima_actualizacion: string|null
    ){}
}