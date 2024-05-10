export interface UpdateUserVerifiedEmailRepository {
    update(email: UpdateUserVerifiedEmailRepository.Params): Promise<UpdateUserVerifiedEmailRepository.Result>
}

export namespace UpdateUserVerifiedEmailRepository {
    export type Params = {
        email: string
    }

    export type Result = boolean | undefined
}