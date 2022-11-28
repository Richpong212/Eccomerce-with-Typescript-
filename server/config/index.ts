import * as dotenv from 'dotenv';
dotenv.config();

const dev = {
    app:{
        port: Number(process.env.PORT) || 4000,
        jwtSecret: String(process.env.JWT_SECRET_KEY),
        authEMAIL: process.env.AUTH_EMAIL|| '',
        authPASSWORD: process.env.AUTH_EMAIL_PASSWORD|| '',
        clientURL: String(process.env.CLIENT_URL),
    }, 
    db: {
        url: process.env.MONGO_URL,
    }
} 

export default dev; 