import { AddShortenUrl } from "../../domain/use-cases/add-shorten-url";
import { UrlRepository } from "../../infra/repositories/url-repository";
import { ShortnerUrl } from "../protocols";

export class DbAddUrlRepository implements AddShortenUrl {
    private readonly urlRepository: UrlRepository
    private readonly shortner: ShortnerUrl

    constructor({urlRepository, shortner}: AddShortenUrl.Dependencies){
        this.urlRepository = urlRepository
        this.shortner = shortner
    }
    
    async add(longUrl: AddShortenUrl.Params): Promise<AddShortenUrl.Result> {
        const shortUrl = await this.urlRepository.loadShortUrl(longUrl)
        if(shortUrl){
            return {
                id: shortUrl.id,
                shortUrl: shortUrl.shortUrl,
                longUrl: longUrl
            }
        }
        const shortnerUrlResult = await this.shortner.encode(longUrl)
        const result = await this.urlRepository.add({
            longUrl,
            shortUrl: shortnerUrlResult.value as string
        })
        return result
    }
    
}