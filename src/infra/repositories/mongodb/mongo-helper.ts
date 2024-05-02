import mongoose, { Document, model } from "mongoose";
import { Url } from "../../../domain/models/url";
import { urlSchema, userSchema } from "./mongo-schemas";
import { User } from "../../../domain/models/user";

export interface IUrl extends Document {
    _id: any
    shortUrl: string
    longUrl: string
}

export interface IUser extends Document {
    _id: any
    name: string
    email: string
    password: string
    verifiedEmail: boolean

}

const urlMongo = model<Url>("Url", urlSchema())
const userMongo = model<User>("User", userSchema())

const parseMongoDocumentToUrl = (url: IUrl) => {
    if(!url){
        return undefined
    }
    return {
        id: url._id,
        shortUrl: url.shortUrl,
        longUrl: url.longUrl
    }
}

const parseMongoDocumentToUser = (user: IUser) => {
    if(!user){
        return undefined
    }
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        verifiedEmail: user.verifiedEmail
    }
}

const connectMongo = async (uri: string) => {
    await mongoose.connect(uri)
}

export {
    urlMongo,
    userMongo,
    parseMongoDocumentToUrl,
    parseMongoDocumentToUser,
    connectMongo
}