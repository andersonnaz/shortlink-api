import { AddUserRepository, LoadUserByEmailRepository } from "../../data/protocols/db/user";
import { parseMongoDocumentToUser, userMongo } from "./mongodb/mongo-helper";

export class UserRepository implements AddUserRepository, LoadUserByEmailRepository {

    async add(params: AddUserRepository.Params): Promise<AddUserRepository.Result> {
        const emailAlreadyExists = await this.load({ email: params.email })
        if(emailAlreadyExists){
            return undefined
        }
        const user = await userMongo.create({...params, verifiedEmail: false})
        const result = parseMongoDocumentToUser(user)
        return result
    }

    async load(params: LoadUserByEmailRepository.Params): Promise<LoadUserByEmailRepository.Result> {
        const user = await userMongo.findOne({ email: params.email })
        if(!user){
            return undefined
        }
        const result = parseMongoDocumentToUser(user)
        return result
    }
}