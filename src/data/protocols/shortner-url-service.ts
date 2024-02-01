export interface ShortnerUrl {
    exec(longerUrl: ShortnerUrl.Params): Promise<ShortnerUrl.Result>
}

export namespace ShortnerUrl {
    export type Params = string
    export type Result = {
        shortUrl: string
    }
}