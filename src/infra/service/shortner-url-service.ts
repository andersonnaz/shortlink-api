
import { ShortnerUrl } from "../../data/protocols";
import { Decoder, Encoder, RandomNumberGenerator } from "../helpers/protocols";

export class ShortnerUrlService implements ShortnerUrl {
    private readonly encoder: Encoder
    private readonly decoder: Decoder
    private readonly randomNumberGenerator: RandomNumberGenerator

    constructor({randomNumberGenerator, encoder, decoder}: ShortnerUrlService.Dependencies){
      this.randomNumberGenerator = randomNumberGenerator
      this.encoder = encoder
      this.decoder = decoder
    }

    async exec(longerUrl: ShortnerUrl.Params): Promise<ShortnerUrl.Result> {
      const randomNumber = await this.randomNumberGenerator.exec()
      if(randomNumber < 0){
        throw new Error()
      }
      const shortUrl = await this.encoder.encode(randomNumber)
      return {
        shortUrl: ''
      }
    }
        
}

export namespace ShortnerUrlService {
  export type Dependencies = {
    encoder: Encoder
    decoder: Decoder
    randomNumberGenerator: RandomNumberGenerator
  }
}