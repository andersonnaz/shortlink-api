import { LoadLongerUrl } from "../../domain/use-cases";
import { HttpRequest, HttpResponse, notFound, serverError, success } from "../helpers";
import { Controller } from "../protocols/controller";

export class LoadUrl implements Controller {
    private readonly loadUrl: LoadLongerUrl

    constructor({ loadUrl }: LoadUrl.Dependencies){
        this.loadUrl = loadUrl
    }

    async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { shortUrl } = HttpRequest.params
            const shortenResult = await this.loadUrl.load(shortUrl)
            if(!shortenResult){
                return notFound(shortUrl)
            }
            return success(shortenResult)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace LoadUrl {
    export type Dependencies = {
        loadUrl: LoadLongerUrl
    }
}