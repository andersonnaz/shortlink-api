import { AddUserRepository, LoadUserByEmailRepository } from "../../data/protocols/db/user";
import { parseMongoDocumentToUser, userMongo } from "./mongodb/mongo-helper";

export class UserRepository implements AddUserRepository, LoadUserByEmailRepository {

    async add(params: AddUserRepository.Params): Promise<AddUserRepository.Result> {
        if(!this.load({ email: params.email })){
            return undefined
        }
        const user = await userMongo.create(params)
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