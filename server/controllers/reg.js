import { sql } from "../db.js"
import bcrypt from "bcryptjs"
import { generateAccessToken } from "../utils/generateToken.js"

export const reg = async (req, res) => {
    const { nick, password } = req.body

    const candidate = await sql`
        select * from users where nick = ${nick}
    `
    if (candidate[0]) {
        return res.send({ message: "Пользователь уже существует" })
    } else {
        const hashPassword = bcrypt.hashSync(password, 7)
        const user = await sql`
            insert into users (nick, password) values (${nick}, ${password}) RETURNING *
        `
        const token = generateAccessToken(user[0].id, user[0].role)
        return res.send({message: `Пользователь с ником ${nick} успешно зарегистрирован`})
    }

}