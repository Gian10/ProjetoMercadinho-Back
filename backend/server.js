const express = require('express')
const app = express()
const consign = require('consign')

consign()
    .then('./config/middleware.js')
    .then('./services')
    .then('./config/routes.js')
    .into(app)


app.listen(3000, ()=>{
    console.log("Executando")
})