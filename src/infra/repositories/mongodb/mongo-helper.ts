import mongoose, { Document, model } from "mongoose";
import { Url } from "../../../domain/models/url";
import { tokenManagerSchema, urlSchema, userSchema } from "./mongo-schemas";
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

export interface ITokenManager extends Document {
    _id: any
    token: string
    tokenCreatedAt: Date
    userId: string
    recoveryPasswordCode: number
}

interface TokenManager {
    token: string
    tokenCreatedAt: Date
    userId: string
    recoveryPasswordCode: number
}

const urlMongo = model<Url>("Url", urlSchema())
const userMongo = model<User>("User", userSchema())
const tokenManager = model<TokenManager>("TokenManager", tokenManagerSchema())

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

const parseMongoDocumentToTokenManager = (params: ITokenManager) => {
    if(!params){
        return undefined
    }
    return {
        id: params._id,
        token: params.token,
        tokenCreatedAt: params.tokenCreatedAt,
        userId: params.userId,
        RecoveryPasswordCode: params.recoveryPasswordCode
    }
}

const connectMongo = async (uri: string) => {
    await mongoose.connect(uri)
}

export {
    urlMongo,
    userMongo,
    tokenManager,
    parseMongoDocumentToUrl,
    parseMongoDocumentToUser,
    parseMongoDocumentToTokenManager,
    connectMongo
}