const sqlite = require('sqlite3').verbose()
let sql

//Connect to DB
//If you don't have app_db.sqlite3, create one
const db = new sqlite.Database('./app_db.sqlite3', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)
})
//Below this line, if not use, comment partial or all of them
//Create table

// sql = `CREATE TABLE phone_book(id INTEGER PRIMARY KEY AUTOINCREMENT, owner TEXT, name TEXT , number TEXT, is_private INTEGER)`
// db.run(sql)
// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)`
// db.run(sql)

//After created table uncomment them and comment them later

// sql = `INSERT INTO users(name, password) VALUES ("Chain13", "IncludedHuman")`
// db.run(sql)
// sql = `INSERT INTO users(name, password) VALUES ("Homunculus", "NotIncludedHuman")`
// db.run(sql)
// sql = `INSERT INTO phone_book(owner, name, number, is_private) VALUES ("Chain13", "Computer shop", "51293487092", 1)`
// db.run(sql)
// sql = `INSERT INTO phone_book(owner, name, number, is_private) VALUES ("Homunculus", "Car shop", "1412789", 1)`
// db.run(sql)
// sql = `INSERT INTO phone_book(owner, name, number, is_private) VALUES ("Homunculus", "Tree shop", "75395", 0)`
// db.run(sql)


module.exports = db
