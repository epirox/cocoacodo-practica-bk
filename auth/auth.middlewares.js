import jwt from 'jsonwebtoken'
import { config } from './auth.config.js'

function authJWT(req, res, next) {

    const token = req.signedCookies.token
    // const auth = req.cookies.token
    // console.log(auth)

    if (!token) return res
        .status(403)
        .send('Hace falta autorización')

    jwt.verify(token, config.secretKey, (err, decoded) => {

        if (err)
            return res
                .status(500)
                .send('El token ha expirado')

        console.log(decoded)

        next()
    })
}
export const middlewares = { authJWT }