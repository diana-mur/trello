import jwt from "jsonwebtoken"

export const generateAccessToken = (req, res) => {
    const payload = {
        id,
        nick
    }
    return jwt.sign(payload, "KEY", { expiresIn: "12h" })
}