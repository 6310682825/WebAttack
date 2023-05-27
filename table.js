const sqlite = require('sqlite3').verbose()
let sql

//Connect to DB
//If you don't have app_db.sqlite3, create one
const db = new sqlite.Database('./app_db.sqlite3', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)
})
//Below this line, if not use, comment partial or all of them
//Create table
sql = `CREATE TABLE phone_book(id INTEGER PRIMARY KEY AUTO INCREMENT, name TEXT, phone TEXT, is_private INTEGER)`
db.run(sql)
sql = `CREATE TABLE users(id INTEGER PRIMARY KEY AUTO INCREMENT, name TEXT, password TEXT)`
db.run(sql)
sql = `INSERT INTO users(name, password) VALUES ("Chain13", "IncludedHuman")`
db.run(sql)
sql = `INSERT INTO phone_book(name, number, is_private) VALUES ("Chain13", "51293487092", 0)`
db.run(sql)
//db.run(sql);

module.exports = db
