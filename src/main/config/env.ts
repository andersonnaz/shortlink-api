import dotenv from 'dotenv'

dotenv.config()
export default {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || "",
    SALT: process.env.SALT || 12,
    MAIL_SERVICE: process.env.MAIL_SERVICE,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS
}