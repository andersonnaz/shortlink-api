import { AddUser } from "../../domain/use-cases/add-user";
import { HashGenerator } from "../protocols/cryptography";
import { AddUserRepository } from "../protocols/db";

export class DbAddUser implements AddUser {
    private readonly userRepository: AddUserRepository
    private readonly hashService: HashGenerator

    constructor({ userRepository, hashServise }: AddUser.Dependencies){
        this.userRepository = userRepository
        this.hashService = hashServise
    }

    async add(params: AddUser.Params): Promise<AddUser.Result> {
        const hashedPassword = await this.hashService.encrypt({ value: params.password })
        const user = await this.userRepository.add({
            name: params.name,
            email: params.email,
            password: hashedPassword
        })
        if(!user.isSuccess){
            return {
                isSuccess: false,
                error: user.error
            }
        }
        return {
            isSuccess: true,
            data: user.data
        }
    }
}