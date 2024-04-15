import { Signup } from "../../../application/controllers";
import { Controller } from "../../../application/protocols/controller";
import { makeDbAddUser } from "../use-cases/db-add-user-factory";

export const makeSignupController = (): Controller => {
    const addUser = makeDbAddUser()
    const dependencies: Signup.Dependencies = {
        addUser
    }
    const signup = new Signup(dependencies)
    return signup
}