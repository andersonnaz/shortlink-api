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
        },
        verifiedEmail: {
            type: Boolean,
            require: true
        }
    })
}

const tokenManagerSchema = (): Schema => {
    return new Schema({
        token: {
            type: String,
            require: true
        },
        tokenCreatedAt: {
            type: Date,
            require: true
        },
        userId: {
            type: String,
            require: true
        },
        recoveryPasswordCode: {
            type: Number,
            require: false
        }
    })
}

export {
    urlSchema,
    userSchema,
    tokenManagerSchema
}