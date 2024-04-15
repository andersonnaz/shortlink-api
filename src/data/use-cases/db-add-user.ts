import { AddUser } from "../../domain/use-cases/add-user";
import { HashGenerator } from "../protocols/cryptography";
import { AddUserRepository } from "../protocols/db/user";

export class DbAddUser implements AddUser {
    private readonly userRepository: AddUserRepository
    private readonly hashService: HashGenerator

    constructor({ userRepository, hashService }: AddUser.Dependencies){
        this.userRepository = userRepository
        this.hashService = hashService
    }

    async add(params: AddUser.Params): Promise<AddUser.Result> {
        const hashedPassword = await this.hashService.encrypt({ value: params.password })
        const user = await this.userRepository.add({
            name: params.name,
            email: params.email,
            password: hashedPassword
        })
        return user
    }
}