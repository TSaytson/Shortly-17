import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRepository } from "../repositories/auth.repository.js";

export async function validateSignUp(req, res, next) {
    
    const { name, email, password } = req.body;

    try {
        const { rowCount: user } =
            await authRepository.findUser(email);

        if (user)
            return res.status(409).
                send('Usuário já cadastrado');
    } catch (error) {
        console.log(error);
        return res.sendStatus(422);
    }

    const hashedPassword = bcrypt.hashSync(
        password, 10
    );

    res.locals.user = {
        name, email, password:hashedPassword
    };

    next();
}

export async function validateSignIn(req, res, next) {
    const { email, password } = req.body;
    try {
        const { rows: userFound } =
            await authRepository.findUser(email);
        
        if (userFound[0]
            && bcrypt.compareSync(
                password, userFound[0].password))

            res.locals.user = userFound[0];
        else
            return res.status(401).
                send('Credenciais incorretas');
    } catch (error) {
        console.log(error);
        return res.sendStatus(422);
    }

    next();
}


export async function verifyAuth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.
        replace('Bearer ', '');

    if (!token)
        return res.status(401).
            send('Não autorizado');

    jwt.verify(token,
        process.env.JWT_SECRET || 'secret',
        (error, decoded) => {
            if (error)
                return res.status(401).
                    send('token inválido');
            res.locals.userId = decoded.id;
        })

    next();
}