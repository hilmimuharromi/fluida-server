const express = require('express')
const cors = require('cors')
const app = express()
const routers = require('./routes/index')
const http = require('http')
const mongoose = require('mongoose')
const morgan = require('morgan');
require('dotenv').config()


app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(morgan('tiny'));
app.use(express.json())
const uriLokal = `mongodb://localhost:27017/${process.env.DB_NAME}`
const uri = `mongodb+srv://bangimi:${process.env.DB_PASSWORD}@cluster-satu.edmta.mongodb.net/fluida?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true })
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