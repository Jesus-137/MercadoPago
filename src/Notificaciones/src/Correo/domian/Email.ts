export class Email{
    constructor(
        readonly uuid: string,
        readonly id_user: string,
        readonly telefono: string,
        readonly code: number
    ){}
}