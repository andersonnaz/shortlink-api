export interface ShortnerUrl {
    encode(longerUrl: ShortnerUrl.Params): Promise<ShortnerUrl.Result>
    decode(shortUrl: ShortnerUrl.Params): Promise<ShortnerUrl.Result>
}

export namespace ShortnerUrl {
    export type Params = string
    export type Result = {
        value: string | number
    }
}