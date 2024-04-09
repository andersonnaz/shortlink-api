export interface LoadByLongerUrlRepository {
    loadShortUrl(longerUrl: LoadByLongerUrlRepository.Params): Promise<LoadByLongerUrlRepository.Result>
}

export namespace LoadByLongerUrlRepository {
    export type Params = string
    export type Result = {
        id: string
        shortUrl: string
    }
}