import dotenv from 'dotenv'
dotenv.config()

const seconds = 60

export const config = {
    secretKey: process.env.SECRET_KEY || 'nikito',
    token: {
        expiresIn: 10,
    },
    cookie:
    {
        maxAge: seconds * 1000,
        httpOnly: true,
        signed: true
    }

}