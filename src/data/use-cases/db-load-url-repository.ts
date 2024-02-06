import { LoadLongerUrl } from "../../domain/use-cases";
import { UrlRepository } from "../../infra/repositories/url-repository";
import { LoadUrlRepository } from "../protocols";

export class DbLoadUrlRepository implements LoadLongerUrl {
    private readonly urlRepository: UrlRepository

    constructor({urlRepository}: LoadLongerUrl.Dependencies){
        this.urlRepository = urlRepository
    }

    async load(shortUrl: LoadUrlRepository.Params): Promise<LoadUrlRepository.Result> {
        const longUrl = await this.urlRepository.loadLongUrl(shortUrl)
        if(!longUrl){
            return undefined
        }
        return longUrl
    }
}