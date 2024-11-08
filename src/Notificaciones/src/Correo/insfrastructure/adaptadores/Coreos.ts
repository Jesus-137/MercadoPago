import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // O usa SMTP u otro servicio según prefieras
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendEmail(to: string, subject: string, message: string): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message
        });
    }
}
