export interface Encoder {
    encode(randomNumber: Encoder.Params): Promise<Encoder.Result>
}

export namespace Encoder {
    export type Params = number
    export type Result = string
}