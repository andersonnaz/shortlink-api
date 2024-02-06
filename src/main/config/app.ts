import express from 'express'
import routes from './routes'
import setupMiddlewares from './middlewares'

export const app = express()

setupMiddlewares(app)
routes(app)