import { AddUrlRepository, LoadByLongerUrlRepository, ShortnerUrl } from "../../data/protocols"

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
        addUrlRepository: AddUrlRepository
        loadUrlRepository: LoadByLongerUrlRepository
        shortner: ShortnerUrl
    }
}