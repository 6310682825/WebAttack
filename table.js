const sqlite = require('sqlite3').verbose()
let sql

//Connect to DB
const db = new sqlite.Database('./app_db.sqlite3', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)
})
//Create table
sql = `INSERT INTO users(name, password) VALUES ("Chain13", "IncludedHuman")`
sql = `INSERT INTO phone_book(name, number, is_private) VALUES ("Chain13", "51293487092", 0)`
//db.run(sql);

module.exports = db
