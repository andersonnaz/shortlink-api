import { DbUpdateEmailConfirmation } from "../../../data/use-cases/db-update-email-confirmation";
import { UpdateEmailConfirmation } from "../../../domain/use-cases";
import { UserRepository } from "../../../infra/repositories/user-repository";

export const makeDbUpdateEmailConfirmation = (): UpdateEmailConfirmation => {
    const userRepository = new UserRepository()
    const dependencies: UpdateEmailConfirmation.Dependencies = {
        userRepository
    }
    const updateEmailConfirmation = new DbUpdateEmailConfirmation(dependencies)
    return updateEmailConfirmation
}