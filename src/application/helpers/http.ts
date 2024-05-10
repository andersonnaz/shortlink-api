import { ServerError, NotFoundError, ConflictEmailUserError } from "../errors"

export interface HttpRequest {
    params?: any,
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

export const updateSuccess = (): HttpResponse => {
    return {
        statusCode: 200,
        body: 'update success'
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

export const conflict = (): HttpResponse => {
    return {
        statusCode: 409,
        body: new ConflictEmailUserError()
    }
}