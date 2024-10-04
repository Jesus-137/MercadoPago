import express from 'express';
import { SendSMS } from './SendSMS';

export const whatsAppRouter = express.Router();
const sendSMS = new SendSMS()

whatsAppRouter.post(
    '/',
    sendSMS.run.bind(sendSMS)
)