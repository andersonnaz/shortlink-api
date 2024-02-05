import { ServerError } from "../errors"

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