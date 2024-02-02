export interface RandomNumberGenerator {
    exec(): Promise<RandomNumberGenerator.Result>
}

export namespace RandomNumberGenerator {
    export type Result = number
}