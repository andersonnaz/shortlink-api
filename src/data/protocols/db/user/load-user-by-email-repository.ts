export interface LoadUserByEmailRepository {
    load(params: LoadUserByEmailRepository.Params): Promise<LoadUserByEmailRepository.Result>
}

export namespace LoadUserByEmailRepository {
    export type Params = {
        email: string
    }

    export type Result = {
        id: string
        name: string
        email: string
        password: string
        verifiedEmail: boolean
    } | undefined
}