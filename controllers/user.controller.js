import { UserModel } from "../models/user.model.js";
import { handleErrorDatabase } from '../database/errors.database.js';
import jwt from 'jsonwebtoken'

// /api/v1/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOneByEmail(email)

        if (!user) return res.status(400).json({
            ok: false,
            msg: "el email no está registrado"
        })

        if (password !== user.password) {
            return res.status(401).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            { email: user.email },
            process.env.SECRET_JWT,
            { expiresIn: '2m' }
        )

        return res.json({
            token,
            email: user.email
        })

    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorDatabase(error)
        return res.status(code).json({ ok: false, msg })
    }
}

const profile = async (req, res) => {
    try {
        console.log(req.email)
        const user = await UserModel.findOneByEmail(req.email)
        return res.json(user)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorDatabase(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const UserController = {
    login,
    profile
}
