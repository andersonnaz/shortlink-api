import { DbLoadUrlRepository } from "../../../data/use-cases/db-load-url-repository";
import { LoadLongerUrl } from "../../../domain/use-cases";
import { UrlRepository } from "../../../infra/repositories/url-repository";

export const makeDbLoadUrl = (): LoadLongerUrl => {
    const urlRepository = new UrlRepository()
    const dbLoadUrl = new DbLoadUrlRepository({
        urlRepository
    })
    return dbLoadUrl
}