import { UrlRepository } from "../../infra/repositories/url-repository"

export interface LoadLongerUrl {
    load(shortUrl: LoadLongerUrl.Params): Promise<LoadLongerUrl.Result>
}

export namespace LoadLongerUrl {
    export type Params = string
    export type Result = {
        longUrl: string
    } | undefined
    export type Dependencies = {
        urlRepository: UrlRepository
    }
}