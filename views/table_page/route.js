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
router.post('/addUser', (req, res) => {
    const name = req.body.name
    const phone = req.body.phoneNumber
    console.log(name, phone)
})
router.post('/editUser', (req,res)=> {
    const name = req.body.name
    const phone = req.body.phoneNumber
    console.log(name, phone)
})
router.post('/deleteUser', (req, res)=> {
    const name = req.body.name
    console.log(name)
})
module.exports = router