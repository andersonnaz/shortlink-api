import { Express, Router } from "express"
import shortenUrlRoute from "../routes/shorten-url-route"

export default (app: Express): void => {
    const router = Router()
    app.use('/api', router)
    shortenUrlRoute(router)
}