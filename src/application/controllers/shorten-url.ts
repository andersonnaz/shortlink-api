import { AddShortenUrl } from "../../domain/use-cases";
import { HttpRequest, HttpResponse, create, serverError } from "../helpers";
import { Controller } from "../protocols/controller";

export class ShortenUrl implements Controller {
    private readonly shortenUrl: AddShortenUrl

    constructor({ shortenUrl }: ShortenUrl.Dependencies){
        this.shortenUrl = shortenUrl
    }

    async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { longUrl } = HttpRequest.body
            const shortenResult = await this.shortenUrl.add(longUrl)
            return create(shortenResult)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace ShortenUrl {
    export type Dependencies = {
        shortenUrl: AddShortenUrl
    }
}