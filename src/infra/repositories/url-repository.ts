import { AddUrlRepository, LoadByLongerUrlRepository } from "../../data/protocols";
import { parseMongoDocumentToUrl, urlMongo } from "./mongodb/mongo-helper";

export class UrlRepository implements AddUrlRepository, LoadByLongerUrlRepository {
    async add(params: AddUrlRepository.Params): Promise<AddUrlRepository.Result> {
        const url = await urlMongo.create(params)
        const result = parseMongoDocumentToUrl(url)
        return result
    }

    async load(longerUrl: LoadByLongerUrlRepository.Params): Promise<LoadByLongerUrlRepository.Result> {
        const url = await urlMongo.findOne({ longUrl: longerUrl})
        const longUrl = parseMongoDocumentToUrl(url)
        return longUrl
    }
}