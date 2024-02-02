import { Encoder } from "./protocols";

export class EncoderService implements Encoder {
    private readonly CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    async encode(randomNumber: number): Promise<string> {
        if (randomNumber < 0) {
            throw new Error()
          }
          let value = randomNumber
          let remainder: number
          let shortUrl = ""
          do {
            remainder = value % 62
            value = Math.floor(value / 62)
            shortUrl = shortUrl + this.CHARACTERS[remainder]
          } while (value != 0)
      
          return shortUrl.split("").reverse().join("")
    }
}