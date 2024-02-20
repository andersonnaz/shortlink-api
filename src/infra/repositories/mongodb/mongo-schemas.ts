import { Schema } from 'mongoose'

const urlSchema = (): Schema => {
    return new Schema({
        shortUrl: {
            type: String,
            require: true,
            index: {
                unique: true
            }
        },
        longUrl: {
            type: String,
            require: true,
        }
    })
}

export {
    urlSchema
}