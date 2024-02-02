import { Schema } from 'mongoose'

const urlSchema = (): Schema => {
    return new Schema({
        id: {
            type: Number,
            require: true,
            index: {
                unique: true
            }
        },
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
            index: {
                unique: true
            }
        }
    })
}

export {
    urlSchema
}