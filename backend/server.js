const express = require('express')
const app = express()
const consign = require('consign')

const db = require('./config/db')
app.db = db

consign()
    .include('./config/passport.js')
    .then('./authentication')
    .then('./config/middleware.js')
    .then('./services')
    .then('./config/routes.js')
    .into(app)


app.listen(3000, ()=>{
    console.log("Executando")
})