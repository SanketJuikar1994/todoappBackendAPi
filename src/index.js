const express = require('express')
const app = express()

const mongoose =require('./database/mongoose')
const userController = require('./controller/user')

app.use(express.json())
app.use(userController)

const port = process.dev || 5000

app.listen(port,(error,response)=>{
    if(error){
     return  console.log("Cannot connect to port")
    }
    console.log("Connected to port",port)
})