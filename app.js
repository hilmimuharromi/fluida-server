const express = require('express')
const cors = require('cors')
const app = express()
const routers = require('./routes/index')
const http = require('http')
const mongoose = require('mongoose')
require('dotenv').config()


app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true })
.then((x) => {
    console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
      app.use(routers)    
})


const server = http.createServer(app)

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log('run on PORT ' + PORT);
})