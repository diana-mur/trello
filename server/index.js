import express from "express";
import cors from "cors"
import { sql } from "./db.js";
import { reg } from "./controllers/reg.js";
import { auth } from "./controllers/auth.js";

const app = express()

app.use(cors())
app.use(express.json())

app.get('/profile', async (req, res) => {
    const { id } = req.body
    const data = await sql`select * from users where id = ${id}`
    res.send(data)
})
app.get('/')

app.post('/reg', reg)
app.post('/auth', auth)

app.put('/updateProfile', async (req, res) => {
    const { id, firstName, secondName, nick, password } = req.body
    const update = await sql`update users set firstName = ${firstName}, secondName = ${secondName}, nick=${nick}, password=${password} where id = ${id} RETURNING *`
    res.send(update)
})

const start = async () => {
    // await sql`create table if not exist users(
    //     id SERIAL PRIMARY KEY NOT NULL,
    //     firstName varchar(255),
    //     secondName varchar(255),
    //     nick varchar(255) UNIQUE NOT NULL,
    //     password varchar(255) NOT NULL,
    //     image varchar(255)
    // )`
    // await sql`create table if not exist community(
    //     id SERIAL PRIMARY KEY NOT NULL,
    //     name varchar(255)
    // )`
    // await sql`create table if not exist merger(
    //     userId INT NOT NULL,
    //     commId INT NOT NULL,
    //     FOREIGN KEY (userId) REFERENCES users(id),
    //     FOREIGN KEY (commId) REFERENCES community(id)
    // )`
    // await sql`create table if not exist projects(
    //     id SERIAL PRIMARY KEY NOT NULL,
    //     name varchar(255),
    //     commId int NOT NULL,
    //     FOREIGN KEY (commId) REFERENCES community(id)
    // )`
    // await sql`create table if not exist tasks(
    //     id SERIAL PRIMARY KEY NOT NULL,
    //     name varchar(255),
    //     text varchar(255),
    //     deadline date NOT NULL,
    //     done boolean,
    //     userId int NOT NULL,
    //     projectId int NOT NULL,
    //     FOREIGN KEY (userId) REFERENCES users(id),
    //     FOREIGN KEY (projectId) REFERENCES projects(id)
    // )`

    app.listen(5000, () => {
        console.log('Сервер был запущен на порту 5000')
    })
}

start()