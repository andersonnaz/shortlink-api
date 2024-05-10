import { Router } from "express"
import { adaptRoute } from "../adapters/express-route-adapter"
import { makeUpdateEmailConfirmationController } from "../factories/controllers/email-confirmation-factory"

export default (router: Router): void => {
    router.put('/:email', adaptRoute(makeUpdateEmailConfirmationController()))
}