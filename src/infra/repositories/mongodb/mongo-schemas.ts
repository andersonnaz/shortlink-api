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

const userSchema = (): Schema => {
    return new Schema({
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String,
            require: true
        }
    })
}

export {
    urlSchema,
    userSchema
}