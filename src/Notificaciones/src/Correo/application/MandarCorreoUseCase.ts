import { Repository } from "../domian/Repository"; 

export class MandarCorreoUseCase {
    constructor(private emailService: Repository) {}

    async execute(to: string, subject: string, message: string): Promise<void> {
        await this.emailService.sendEmail(to, subject, message);
    }
}
