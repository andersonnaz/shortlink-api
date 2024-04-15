import { AddUser } from "../../domain/use-cases/add-user";
import { HttpRequest, HttpResponse, conflict, create, serverError } from "../helpers";
import { Controller } from "../protocols/controller";

export class Signup implements Controller {
    private readonly addUser: AddUser

    constructor({ addUser }: Signup.Dependencies){
        this.addUser = addUser
    }

    async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { name, email, password } = HttpRequest.body
            const addUserResult = await this.addUser.add({ name, email, password })
            if(!addUserResult){
                return conflict()
            }
            return create(addUserResult)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace Signup {
    export type Dependencies = {
        addUser: AddUser
    }
}