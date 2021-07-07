require('dotenv').config()
const db = require('./models')
db.connect()

const dbTest = async () => {
  try {
    // cREATE
    const newUser = new db.User({
      name: 'oliver cromwell',
      email: 'o@c.com',
      password: 'oliver'
    })
    await newUser.save()
    console.log('new user: ', newUser)
    // READ -- at long

    const foundUser = await db.User.findOne({
      name: 'oliver cromwell'
    })
    console.log('found user: ', foundUser)

  } catch (err) {
    console.log(err)
  }
}

dbTest()