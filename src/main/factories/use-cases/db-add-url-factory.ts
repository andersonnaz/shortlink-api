import { DbAddUrlRepository } from "../../../data/use-cases/db-add-url-repository";
import { AddShortenUrl } from "../../../domain/use-cases";
import { DecoderService } from "../../../infra/helpers/decoder-service";
import { EncoderService } from "../../../infra/helpers/encoder-service";
import { RandomNumberGeneratorService } from "../../../infra/helpers/random-number-generator-service";
import { UrlRepository } from "../../../infra/repositories/url-repository";
import { ShortnerUrlService } from "../../../infra/service/shortner-url-service";

export const makeDbAddUrl = (): AddShortenUrl => {
    const urlRepository = new UrlRepository()
    const decoder = new DecoderService()
    const encoder = new EncoderService()
    const randomNumberGenerator = new RandomNumberGeneratorService()
    const shortner = new ShortnerUrlService({
        randomNumberGenerator,
        encoder,
        decoder
    })
    const addShortenUrl = new DbAddUrlRepository({
        urlRepository,
        shortner
    })
    return addShortenUrl
}