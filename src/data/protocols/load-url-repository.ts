export interface LoadUrlRepository {
    loadLongUrl(shortUrl: LoadUrlRepository.Params): Promise<LoadUrlRepository.Result>
}

export namespace LoadUrlRepository {
    export type Params = string
    export type Result = {
        id: string
        longUrl: string
    }
}