import { HashGenerator } from "../../data/protocols/cryptography"
import { AddUserRepository } from "../../data/protocols/db/user"

export interface AddUser {
    add(params : AddUser.Params): Promise<AddUser.Result>
}

export namespace AddUser {
    export type Params = {
        name: string
        email: string
        password: string
    }

    export type Result = {
        id: string,
        name: string
        email: string
        password: string
    }

    export type Dependencies = {
        userRepository: AddUserRepository
        hashService: HashGenerator
    }
}