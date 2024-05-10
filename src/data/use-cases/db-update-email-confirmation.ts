import { UpdateEmailConfirmation } from "../../domain/use-cases";
import { UpdateUserVerifiedEmailRepository } from "../protocols/db/user";

export class DbUpdateEmailConfirmation implements UpdateEmailConfirmation {
    private readonly userRepository: UpdateUserVerifiedEmailRepository

    constructor({ userRepository }: UpdateEmailConfirmation.Dependencies){
        this.userRepository = userRepository
    }

    async update(email: UpdateEmailConfirmation.Params): Promise<UpdateEmailConfirmation.Result> {
        const result = await this.userRepository.update(email)
        return result
    }
}