//import router.js file from Router
const router = require('./Router/router')  

//1) import dotenv
require('dotenv').config()

//2) import express module
const express = require('express')

require('./DB/connections')

//3) import cors module
const cors = require('cors')
//const appMiddleware = require('./Middlewares/appMiddleware')

//4) create server using express 
const pfServer = express()

//5)inject cors into pfserver
pfServer.use(cors())

//6) use middleware to convert JSON dta to js object
pfServer.use(express.json())
//pfServer.use(appMiddleware)
pfServer.use(router)

//pfServer should expose the uploads folder
pfServer.use('/uploads',express.static('./uploads'))

//7) provide PORT
const PORT = 4000;

//8)run the server
pfServer.listen(PORT,()=>{
    console.log(`pfServer is running in ${PORT}`);    
})

pfServer.get('/',(req,res)=>{
    res.send("server for portfolio fair is running and waiting for client requests!!!!")
})