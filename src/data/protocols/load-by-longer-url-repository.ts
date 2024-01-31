export interface LoadByLongerUrlRepository {
    load(longerUrl: LoadByLongerUrlRepository.Params): Promise<LoadByLongerUrlRepository.Result>
}

export namespace LoadByLongerUrlRepository {
    export type Params = string
    export type Result = {
        id: string
        shortUrl: string
    }
}