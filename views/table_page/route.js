const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/table', (req, res) => {
    if (req.session.login) {
        res.sendFile(path.join(__dirname, '/templates/index.html'))
    }
    else {
        res.redirect('/login')
    }
})
router.post('/table', (req, res) => {
    const name = req.body.name
    const text = req.body.text
    const phone = req.body.phone
    console.log(name, text, phone)
})
module.exports = router