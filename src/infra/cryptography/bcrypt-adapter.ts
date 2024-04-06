import { HashGenerator } from "../../data/protocols/cryptography";
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashGenerator {
    private readonly salt: number

    constructor(salt: number){
        this.salt = salt
    }

    async encrypt(param: HashGenerator.Params): Promise<HashGenerator.Result> {
        return await bcrypt.hash(param.value, this.salt)
    }
}