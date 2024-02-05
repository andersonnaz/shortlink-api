import { HttpRequest, HttpResponse } from "../helpers";

export interface Controller {
    handle(HttpRequest: HttpRequest): Promise<HttpResponse>
}