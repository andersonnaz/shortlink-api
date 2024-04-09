import { HashGenerator } from "../../data/protocols/cryptography"
import { AddUserRepository } from "../../data/protocols/db/user"
import { User } from "../models/user"

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
        isSuccess: boolean
        error?: Error
        data?: User
    }

    export type Dependencies = {
        userRepository: AddUserRepository
        hashServise: HashGenerator
    }
}