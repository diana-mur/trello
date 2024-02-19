import bcrypt from "bcryptjs"
import { generateAccessToken } from "../utils/generateToken.js"
import { sql } from "../db.js"

export const auth = async (req, res) => {
    const { nick, password } = req.body
    const user = await sql`
        select * from users where nick = ${nick}
        `
    if (!user) {
        return res.send({ message: "Пользователь не найден" })
    }
    const validPassword = bcrypt.compareSync(password, user[0].password)
    if (!validPassword) {
        return res.send({message: "Неверный пароль"})
    }
    const token = generateAccessToken(user[0].id, user[0].nick)
    return res.json({
        token: token,
        user: user[0]
    })
}