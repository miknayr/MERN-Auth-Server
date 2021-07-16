// configure dotenv
require('dotenv').config()
// required for server
const express = require('express')

const cors = require('cors')
const rowdy = require('rowdy-logger')
// connect to DB
const db = require('./models')
db.connect()

// configure express app
const app = express()
const PORT = process.env.PORT || 3001
const rowdyResults = rowdy.begin(app)

// middlewares
app.use(cors())
// body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // for the request body
// custom middle ware
app.use((req,res, next) =>{
// console.log(`incoming request: ${req.method} ${req.url}`)
res.locals.anything = 'rocket🚀'
next()
})


app.use((req, res, next) => {
  // console.log('hello from a middleware! ')
  next()
})
// controllers
app.use('/api-v1/users', require('./controllers/api-v1/users.js'))
// app.use('/api-v1/events', require('./controllers/api-v1/events.js'))

const middleWare = (req, res, next) => {
  // console.log(' i am a route specific middleware! 👾')
  next()
}

app.get('/', middleWare, (req, res) => {
  // console.log(res.locals)
  res.json({ msg:  'hello from the backend! 👋 '})
})

// listen on port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Listening on port ${PORT}`)
})