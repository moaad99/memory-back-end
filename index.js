
const express = require ('express')

const mongoose= require('mongoose')
const cors = require ('cors')

const app = express()
app.use(express.static('public'))
const postrouter =require('./Routes/Post') 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Headers', "*");
        next();
      }
app.use(allowCrossDomain);
     
app.listen(8000, console.log('serveur running in port 8000'))
app.use(cors())
app.use('/',postrouter)

mongoose.connect('mongodb+srv://MOAD-user:widadrey991@sandbox.grdig.mongodb.net/memory',{useUnifiedTopology: true,useNewUrlParser: true } )
        .then(()=> console.log("connected to db"))
        .catch((err) => console.error('not connected to db'))