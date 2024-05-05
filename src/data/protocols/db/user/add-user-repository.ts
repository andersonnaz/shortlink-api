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
        id: string
        name: string
        email: string
        verifiedEmail: boolean
    } | undefined
}