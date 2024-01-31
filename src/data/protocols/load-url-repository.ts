export interface LoadUrlRepository {
    load(shortUrl: LoadUrlRepository.Params): Promise<LoadUrlRepository.Result>
}

export namespace LoadUrlRepository {
    export type Params = string
    export type Result = {
        longerUrl: string
    }
}