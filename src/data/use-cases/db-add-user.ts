import { AddUser } from "../../domain/use-cases/add-user";
import { EmailService } from "../protocols/communication/email-service";
import { HashGenerator } from "../protocols/cryptography";
import { AddUserRepository } from "../protocols/db/user";

export class DbAddUser implements AddUser {
    private readonly userRepository: AddUserRepository
    private readonly hashService: HashGenerator
    private readonly emailService: EmailService

    constructor({ userRepository, hashService, emailService }: AddUser.Dependencies){
        this.userRepository = userRepository
        this.hashService = hashService
        this.emailService = emailService
    }

    async add(params: AddUser.Params): Promise<AddUser.Result> {
        const hashedPassword = await this.hashService.encrypt({ value: params.password })
        const user = await this.userRepository.add({
            name: params.name,
            email: params.email,
            password: hashedPassword
        })
        const emailConfirmationSent = this.emailConfirmation(user.name, user.email)
        if(!emailConfirmationSent){
            return undefined
        }
        return user
    }

    private async emailConfirmation (name: string, email: string): Promise<boolean> {
        const result = await this.emailService.send({
            from: process.env.MAIL_USER,
            subject: 'Email confirmation',
            to: email,
            text: `
                Olá ${name}
                click no link abaixo para confirmar seu email
            `
        })
        return result
    } 
}