const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const router = express.Router()
const db = require('../../table.js')

let sql
router.get('/', (req, res) => {
    res.redirect('/table')
})
router.get('/login', (req, res) => {
    if (req.cookies.login) {
        res.redirect('/table')
    }
    else {
        res.sendFile(path.join(__dirname, '/templates/login.html'))
    }
})
router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const expire = 30000
    sql = `SELECT * FROM users WHERE name = "${username}" AND password = "${password}";`
    db.all(sql,[],(err,rows)=>{
        if (err) return res.redirect('/login')
        if (rows.length == 0) return res.redirect('/login')
        res.cookie('username', username, {maxAge:expire})
        res.cookie('password', password, {maxAge:expire})
        res.cookie('login', true, {maxAge:expire})
        res.redirect('/')
    })
    /*
    if (username === "Chain13" && password === "IncludedHuman") {
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = expire
        res.redirect('/')
    }
    else {
        res.redirect('/login')
    }
    */
})
module.exports = router