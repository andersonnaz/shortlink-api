import { ShortnerUrl } from "../../data/protocols/db/url"
import { UrlRepository } from "../../infra/repositories/url-repository"

export interface AddShortenUrl {
    add(longUrl: AddShortenUrl.Params): Promise<AddShortenUrl.Result>
}

export namespace AddShortenUrl {
    export type Params = string
    export type Result = {
        id: string
        shortUrl: string
        longUrl: string
    } | undefined
    export type Dependencies = {
        urlRepository: UrlRepository
        shortner: ShortnerUrl
    }
}