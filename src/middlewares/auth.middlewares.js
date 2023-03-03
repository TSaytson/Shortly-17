import bcrypt from 'bcrypt';
import { verifyUser } from "../repositories/auth.repositories.js";

export async function validateSignUp(req, res, next) {
    
    const { name, email, password } = req.body;

    try {
        const { rowCount: user } =
            await verifyUser(email);

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
            await verifyUser(email);

        if (userFound
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