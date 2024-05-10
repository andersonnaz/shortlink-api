import { UpdateEmailConfirmation } from "../../domain/use-cases";
import { HttpRequest, HttpResponse, notFound, serverError, updateSuccess } from "../helpers";
import { Controller } from "../protocols/controller";

export class UpdateEmailConfirmationController implements Controller {
    private readonly emailConfirmation: UpdateEmailConfirmation

    constructor({ emailConfirmation }: UpdateEmailConfirmationController.Dependencies){
        this.emailConfirmation = emailConfirmation
    }

    async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const email = HttpRequest.params
            const emailConfirmationResult = await this.emailConfirmation.update(email)
            if(!emailConfirmationResult){
                return notFound(email)
            }
            return updateSuccess()
        } catch (error) {
            serverError(error)
        }
    }
}

export namespace UpdateEmailConfirmationController {
    export type Dependencies = {
        emailConfirmation: UpdateEmailConfirmation
    }
}