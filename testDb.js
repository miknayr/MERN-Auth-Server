require('dotenv').config()
const db = require('./models')
db.connect()

const dbTest = async () => {
  try {
    // cREATE
    // const newUser = new db.User({
    //   name: 'jdinh',
    //   email: 'jd4@gmail.com',
    //   password: '1234'
    // })
    // await newUser.save()
    // console.log('new user: ', newUser)

    // const deleteLocation = db.Location.findOneAndDelete({
    //   _id: "60f0687621483b193c78f64e"
    // })
    // console.log(`Deleted Location: ${deleteLocation}`)

    // const newLocation3 = new db.Location({
    //   name: "Barn"
    // })
    // await newLocation3.save()
    // console.log(`New Location: ${newLocation3}`)

    // const newLocation4 = new db.Location({
    //   name: "Stage"
    // })
    // await newLocation4.save()
    // console.log(`New Location: ${newLocation4}`)
    
    // READ -- at long

    // const foundUser = await db.User.findOne({
    //   name: 'oliver cromwell'
    // })
    // console.log('found user: ', foundUser)

  } catch (err) {
    console.log(err)
  }
}

dbTest()