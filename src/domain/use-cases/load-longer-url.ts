import { LoadUrlRepository } from "../../data/protocols"

export interface LoadLongerUrl {
    load(shortUrl: LoadLongerUrl.Params): Promise<LoadLongerUrl.Result>
}

export namespace LoadLongerUrl {
    export type Params = string
    export type Result = {
        longerUrl: string
    } | undefined
    export type Dependencies = {
        urlRepository: LoadUrlRepository
    }
}