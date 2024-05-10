import { UpdateUserVerifiedEmailRepository } from "../../data/protocols/db/user/update-user-verified-email-repository"

export interface UpdateEmailConfirmation {
    update(email: UpdateEmailConfirmation.Params): Promise<UpdateEmailConfirmation.Result>
}

export namespace UpdateEmailConfirmation {
    export type Params = {
        email: string
    }

    export type Result = boolean | undefined

    export type Dependencies = {
        userRepository: UpdateUserVerifiedEmailRepository
    }
}