import { ServerError } from "../errors"
import { NotFoundError } from "../errors/not-found-error"

export interface HttpRequest {
    body?: any
}

export interface HttpResponse {
    statusCode: number
    body: any
}

export const success = (data: any): HttpResponse => {
    return {
        statusCode: 200,
        body: data
    }
}

export const create = (data: any): HttpResponse => {
    return {
        statusCode: 201,
        body: data
    }
}

export const serverError = (error: Error): HttpResponse => {
    return {
        statusCode: 500,
        body: new ServerError(error.stack as string)
    }
}

export const notFound = (param: string): HttpResponse => {
    return {
        statusCode: 404,
        body: new NotFoundError(param)
    }
}