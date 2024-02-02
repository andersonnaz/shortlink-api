export interface Decoder {
    decode(shortUrl: Decoder.Params): Promise<Decoder.Result>
}

export namespace Decoder {
    export type Params = string
    export type Result = number
}