import { Transporter, createTransport } from "nodemailer";
import { EmailService } from "../../data/protocols/communication/email-service";

export class NodeMailerAdapter implements EmailService {
    private readonly transporter: Transporter

    constructor(transporter: EmailService.Transport){
        this.transporter = createTransport(transporter)
    }

    async send(options: EmailService.Options): Promise<EmailService.Result> {
        const result = await this.transporter.sendMail(options)
        if(!result){
            return false
        }
        return true
    }
}