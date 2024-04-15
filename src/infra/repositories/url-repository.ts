import { AddUrlRepository, LoadByLongerUrlRepository, LoadUrlRepository } from "../../data/protocols/db/url";
import { parseMongoDocumentToUrl, urlMongo } from "./mongodb/mongo-helper";

export class UrlRepository implements AddUrlRepository, LoadByLongerUrlRepository, LoadUrlRepository {

    async add(params: AddUrlRepository.Params): Promise<AddUrlRepository.Result> {
        const url = await urlMongo.create(params)
        const result = parseMongoDocumentToUrl(url)
        return result
    }

    async loadShortUrl(longerUrl: LoadByLongerUrlRepository.Params): Promise<LoadByLongerUrlRepository.Result> {
        const url = await urlMongo.findOne({ longUrl: longerUrl })
        const longUrl = parseMongoDocumentToUrl(url)
        return longUrl
    }

    async loadLongUrl(shorterUrl: LoadByLongerUrlRepository.Params): Promise<LoadUrlRepository.Result> {
        const url = await urlMongo.findOne({ shortUrl: shorterUrl })
        const shortUrl = parseMongoDocumentToUrl(url)
        return shortUrl
    }
}