const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const router = express.Router()
router.get('/', (req, res) => {
    res.send("Home page")
})
router.get('/login', (req, res) => {
    if (req.session.login) {
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

})
module.exports = router