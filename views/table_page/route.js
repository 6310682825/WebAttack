const express = require('express')
const path = require('path')
const router = express.Router()
const db = require('../../table.js')
let sql

router.get('/table', (req, res) => {
    if (req.session.login) {
        sql = `SELECT * FROM phone_book WHERE is_private = false or owner = (?)`
        db.all(sql, [req.session.username], (err, rows) => {
            if (err) return console.log(err.message)
            res.render('./table_page/templates/index.ejs', { data: rows, user: req.session.username})
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
    sql = "INSERT INTO phone_book (name, owner, number) VALUES (?,?,?)"
    // console.log(name, phone)
    db.run(sql, [name, req.session.username, phone], (err) => {
        if (err) return console.log(err.message)
    })
    res.redirect('/table')
})
router.post('/editUser', (req,res)=> {
    const id = req.body.id
    const name = req.body.name
    const phone = req.body.phoneNumber
    sql = "UPDATE phone_book SET name = ?, number = ? WHERE id = ?"
    // console.log(id,name, phone)
    db.run(sql, [name, phone, id], (err) => {
        if (err) return console.log(err.message)
    })
    res.json({name:name, phone:phone})
})
router.post('/deleteUser', (req, res)=> {
    const id = req.body.id
    sql = `DELETE FROM phone_book WHERE id=?`
    db.run(sql, [id], (err) => {
        if (err) return console.log(err.message)
    })
    // console.log("This run!")
    return res.redirect(req.get('referer'));
})
router.post('/is_private', (req, res) => {
    const id = req.body.id
    const is_private = req.body.is_private
    sql = `UPDATE phone_book SET is_private = (?) WHERE id = (?)`
    db.run(sql, [is_private, id], (err) => {
        if (err) return console.log(err.message)
    })
    res.json({id: id, is_private:is_private})
})
module.exports = router