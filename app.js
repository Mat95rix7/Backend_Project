const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const path = require('path')

const app = express()

require('dotenv').config()

app.use(express.json())

const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')

const MANGO_ACCESS = process.env.MANGODB_CONNECT
mongoose.connect(MANGO_ACCESS)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })

// app.use(bodyParser.json())
app.use(cors())
app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))


module.exports = app