import { IEmailProvider, IMessage } from "../IEmailProvider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export class MailTrapMailProvider implements IEmailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "5dab5c1b5cf822",
                pass: "016571cbb6baaa"
            }
        })
    }

    async sendEmail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: { name: message.to.name, address: message.to.email },
            from: { name: message.from.name, address: message.to.email },
            subject: message.subject,
            html: message.message
        });
    }
}