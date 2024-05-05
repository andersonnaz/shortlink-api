import { DbAddUser } from "../../../data/use-cases/db-add-user";
import { AddUser } from "../../../domain/use-cases/add-user";
import { NodeMailerAdapter } from "../../../infra/communication";
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt-adapter";
import { UserRepository } from "../../../infra/repositories/user-repository";
import env from '../../config/env'

export const makeDbAddUser = (): AddUser => {
    const salt = Number(env.SALT)
    const transport = {
        service: env.MAIL_SERVICE,
        auth: {
            user: env.MAIL_USER,
            pass: env.MAIL_PASS
        }
    }
    const hashService = new BcryptAdapter(salt)
    const userRepository = new UserRepository()
    const emailService = new NodeMailerAdapter(transport)
    const dependencies: AddUser.Dependencies = {
        userRepository,
        hashService,
        emailService
    }
    const addUser = new DbAddUser(dependencies)
    return addUser
}