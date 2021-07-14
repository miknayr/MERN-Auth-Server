// require mongoose package 
const mongoose = require('mongoose')
require('dotenv').config()

// connection function
const connect = () => {
  const MONGODB_URI = process.env.MONGODB_URI
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  const db = mongoose.connection
  db.once('open', () => {
    console.log(`🍇🍇🍇ALL PRAISE MONGOD-B @ ${db.host}:${db.port}🍇🍇🍇`)
  })
  db.on('error', (err) => {
    console.log('not praising the mongod-b.')
    console.log(err)
  })

}

// export the connection function and models
module.exports = {
  connect,
  User: mongoose.model('User', require('./User')),
  Event: mongoose.model('Event', require('./Event'))
}
