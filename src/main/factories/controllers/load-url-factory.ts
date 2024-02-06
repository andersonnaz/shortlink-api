import { LoadUrl } from "../../../application/controllers";
import { Controller } from "../../../application/protocols/controller";
import { makeDbLoadUrl } from "../use-cases/db-load-url.factory";

export const makeLoadUrlController = (): Controller => {
    const loadUrl = makeDbLoadUrl()
    const loadUrlController = new LoadUrl({
        loadUrl
    })
    return loadUrlController
}