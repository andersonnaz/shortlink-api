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
    _id: any,
    name: string,
    email: string,
    password: string
}

const urlMongo = model<Url>("Url", urlSchema())
const userMongo = model<User>("User", userSchema())

const parseMongoDocumentToUrl = (url: IUrl) => {
    if(!url){
        return undefined
    }
    return {
        ...url,
        id: url._id
    }
}

const parseMongoDocumentToUser = (user: IUser) => {
    if(!user){
        return undefined
    }
    return {
        ...user,
        id: user._id
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