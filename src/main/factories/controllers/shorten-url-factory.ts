import { ShortenUrl } from "../../../application/controllers";
import { Controller } from "../../../application/protocols/controller";
import { makeDbAddUrl } from "../use-cases/db-add-url-factory";

export const makeShortenUrlController = (): Controller => {
    const shortenUrl = makeDbAddUrl()
    const shortenUrlController = new ShortenUrl({
        shortenUrl
    })

    return shortenUrlController
}