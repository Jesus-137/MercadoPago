export class WhatsApp{
    constructor(
        readonly uuid: string,
        readonly id_user: string,
        readonly telefono: string,
        readonly code: number
    ){}
}