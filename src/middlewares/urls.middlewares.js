import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function verifyAuth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.
        replace('Bearer ', '');
    
    if (!token)
        return res.status(401).
            send('Não autorizado');
    
    jwt.verify(token,
        process.env.JWT_SECRET,
        (error, decoded) => {
            if (error)
                return res.status(401).
                    send('token inválido');
            res.locals.userId = decoded.id;
        })
    
    next();
}