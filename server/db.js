import postgres from "postgres"

export const sql = postgres({
    host: 'localhost',
    port: 5432,
    db: 'trello',
    username: 'postgres',
    password: 1111
})