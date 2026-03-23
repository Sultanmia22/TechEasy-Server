import dotenv from 'dotenv';
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    port: process.env.PORT || 500,

    database_url: process.env.MONGODB_URI,

    db_name: process.env.DB_NAME,

    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 12,

    nextauth_secret: process.env.NEXTAUTH_SECRET,

    gemini_api_key: process.env.GEMINI_API_KEY,
}