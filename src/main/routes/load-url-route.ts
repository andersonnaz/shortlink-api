import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeLoadUrlController } from "../factories/controllers/load-url-factory";

export default (router: Router): void => {
    router.get('/:shortUrl', adaptRoute(makeLoadUrlController()))
}