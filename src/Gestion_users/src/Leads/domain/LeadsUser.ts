export class LeadsUser{
    constructor(
        readonly id: number,
        readonly uuid: string,
        readonly username: string,
        readonly telefono: string,
        readonly correo: string
    ){}
}