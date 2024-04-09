import { User } from "../../../../domain/models/user"

export interface AddUserRepository {
    add(params: AddUserRepository.Params): Promise<AddUserRepository.Result>
}

export namespace AddUserRepository {
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
}