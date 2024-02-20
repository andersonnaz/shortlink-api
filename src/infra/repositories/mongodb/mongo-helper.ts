import mongoose, { Document, model } from "mongoose";
import { Url } from "../../../domain/models/url";
import { urlSchema } from "./mongo-schemas";

export interface IUrl extends Document {
    _id: any
    shortUrl: string
    longUrl: string
}

const urlMongo = model<Url>("Url", urlSchema())

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

const connectMongo = async (uri: string) => {
    await mongoose.connect(uri)
}

export {
    urlMongo,
    parseMongoDocumentToUrl,
    connectMongo
}