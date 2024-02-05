import { Express, json } from 'express'

export const setupApp = (app: Express) => {
    app.use(json())
}