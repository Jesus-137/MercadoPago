export interface Repository {
    sendEmail(to: string, subject: string, message: string): Promise<void>;
}