const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser())
app.use(session({ secret: "mysession", resave: false, saveUninitialized: false }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./views/table_page/route'))
app.use(require('./views/login/route'))
app.listen(8000, () => {
    console.log("start server on port 8000")
})