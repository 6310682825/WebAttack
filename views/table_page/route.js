const express = require('express')
const path = require('path')
const router = express.Router()
const db = require('../../table.js')
let sql

router.get('/table', (req, res) => {
    if (req.session.login) {
        sql = `SELECT name, owner, number FROM phone_book`
        db.all(sql, [], (err, rows) => {
            if (err) return console.log(err.message)
            console.log(rows)
            res.render('./table_page/templates/index.ejs', { data: rows})
        })
        //res.sendFile(path.join(__dirname, '/templates/index.html'))
    }
    else {
        res.redirect('/login')
    }
})
router.post('/addUser', (req, res) => {
    const name = req.body.name
    const phone = req.body.phoneNumber
    sql = "INSERT INTO phone_book (name, number) VALUES (?,?)"
    console.log(name, phone)
})
router.post('/editUser', (req,res)=> {
    const name = req.body.name
    const phone = req.body.phoneNumber
    sql = "UPDATE phone_book SET number = ? WHERE id = ?"
    console.log(name, phone)
})
router.post('/deleteUser', (req, res)=> {
    const id = req.body.id
    sql = `DELETE FROM phone_book WHERE id=?`
    console.log(id)
    res.redirect('/')
})
module.exports = router