export interface AddUrlRepository {
    add(params: AddUrlRepository.Params): Promise<AddUrlRepository.Result>
}

export namespace AddUrlRepository {
    export type Params = {
        shortUrl: string
        longUrl: string
    }
    export type Result = {
        id: string
        shortUrl: string
        longUrl: string
    } | undefined
}