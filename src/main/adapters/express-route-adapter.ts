import { Request, Response } from "express";
import { Controller } from "../../application/protocols/controller";
import { HttpRequest, HttpResponse } from "../../application/helpers";

export const adaptRoute = (controller : Controller) => {
    return async (request: Request, response: Response) => {
        const httpRequest: HttpRequest = {
            params: request.params,
            body: request.body
        }
        const httpResponse: HttpResponse = await controller.handle(httpRequest)
        response.status(httpResponse.statusCode).json(httpResponse.body)
    }
}