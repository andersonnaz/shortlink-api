import { UpdateEmailConfirmationController } from "../../../application/controllers/email-confirmation";
import { Controller } from "../../../application/protocols/controller";
import { makeDbUpdateEmailConfirmation } from "../use-cases/db-update-email-confirmation-factory";

export const makeUpdateEmailConfirmationController = (): Controller => {
    const emailConfirmation = makeDbUpdateEmailConfirmation()
    const dependencies: UpdateEmailConfirmationController.Dependencies = {
        emailConfirmation
    }
    const updateEmailConfirmationController = new UpdateEmailConfirmationController(dependencies)
    return updateEmailConfirmationController
}