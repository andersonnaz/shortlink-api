import { AddUrlRepository } from "../../data/protocols";
import { parseMongoDocumentToUrl, urlMongo } from "./mongodb/mongo-helper";

export class UrlRepository implements AddUrlRepository {
    async add(params: AddUrlRepository.Params): Promise<AddUrlRepository.Result> {
        const url = await urlMongo.create(params)
        const result = parseMongoDocumentToUrl(url)
        return result
    }
}