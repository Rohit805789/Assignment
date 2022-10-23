require('dotenv').config()
const express = require("express")
const routerStudent = require('./api/student/student.routes')
const path = require('path');
const fs = require("fs");

const app= express()

app.use(express.json())

app.use(express.static(__dirname + "/public/"))



app.use('/api',routerStudent)

app.listen(process.env.APPPORT,()=>{
    console.log("server is running ",process.env.APPPORT)
})

