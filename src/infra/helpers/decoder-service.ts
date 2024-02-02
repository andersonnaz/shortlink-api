import { Decoder } from "./protocols";

export class DecoderService implements Decoder {
    private readonly CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    async decode(shortUrl: Decoder.Params): Promise<Decoder.Result> {
        if (shortUrl.split("").some((value) => !this.CHARACTERS.includes(value))) {
            throw new Error()
        }
      
        let id = 0
        for (let i = 0; i < shortUrl.length; i++) {
            let remainder = this.CHARACTERS.indexOf(shortUrl[i])
            let exponent = shortUrl.length - i - 1
            id += remainder * 62 ** exponent
        }
        return id
    }
}