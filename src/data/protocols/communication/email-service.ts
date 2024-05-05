export interface EmailService {
    send(options: EmailService.Options): Promise<EmailService.Result>
}

export namespace EmailService {
    export type Transport = {
        service: string
        auth: {
            user: string
            pass: string
        }
    }
    export type Options = {
        from: string
        to: string
        subject: string
        text: string
    }
    export type Result = boolean
}