import { NextFunction, Request, Response } from "express";

export const cors = (request: Request, response: Response, next: NextFunction) => {
    response.set('access-control-allow-origin', '*')
    response.set('access-control-allow-methods', '*')
    response.set('access-controll-allow-headers', '*')
    next()
}