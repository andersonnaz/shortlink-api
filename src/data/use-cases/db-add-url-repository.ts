import { AddShortenUrl } from "../../domain/use-cases/add-shorten-url";
import { AddUrlRepository, LoadByLongerUrlRepository, ShortnerUrl } from "../protocols";

export class DbAddUrlRepository implements AddShortenUrl {
    private readonly addUrlRepository: AddUrlRepository
    private readonly loadByLongerUrlRepository: LoadByLongerUrlRepository
    private readonly shortner: ShortnerUrl

    constructor({addUrlRepository, loadUrlRepository, shortner}: AddShortenUrl.Dependencies){
        this.addUrlRepository = addUrlRepository
        this.loadByLongerUrlRepository = loadUrlRepository
        this.shortner = shortner
    }
    
    async add(longUrl: AddShortenUrl.Params): Promise<AddShortenUrl.Result> {
        const shortUrl = await this.loadByLongerUrlRepository.load(longUrl)
        if(shortUrl){
            return {
                id: shortUrl.id,
                shortUrl: shortUrl.shortUrl,
                longUrl: longUrl
            }
        }
        const shortnerUrlResult = await this.shortner.exec(longUrl)
        const result = await this.addUrlRepository.add({
            longUrl,
            shortUrl: shortnerUrlResult.shortUrl
        })
        return result
    }
    
}