export class LeadsUser{
    constructor(
        readonly id: number,
        readonly uuid: string,
        readonly username: string,
        readonly nombre: string,
        readonly telefono: string
    ){}
}