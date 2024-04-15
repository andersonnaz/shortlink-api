import { DbAddUser } from "../../../data/use-cases/db-add-user";
import { AddUser } from "../../../domain/use-cases/add-user";
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt-adapter";
import { UserRepository } from "../../../infra/repositories/user-repository";
import env from '../../config/env'

export const makeDbAddUser = (): AddUser => {
    const salt = Number(env.SALT)
    const hashService = new BcryptAdapter(salt)
    const userRepository = new UserRepository()
    const dependencies: AddUser.Dependencies = {
        userRepository,
        hashService
    }
    const addUser = new DbAddUser(dependencies)
    return addUser
}