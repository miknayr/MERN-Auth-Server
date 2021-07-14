require('dotenv').config()
const db = require('./models')
db.connect()

const dbConnection = async () => {
  try {
    // cREATE
  const foundUser1 = await db.User.findOne({
      name:"test3"
  })
    // console.log('found user1:', foundUser1)
  const foundUser2= await db.User.findOne({
      name:"jd"
  })
//   console.log('found user2:', foundUser2)

    foundUser1.friends.push(foundUser2._id)
    foundUser2.friends.push(foundUser1._id)
    
    await foundUser1.save()
    await foundUser2.save()


    console.log("found 1:", foundUser1)
    console.log("found 2", foundUser2)
   
    // READ -- at long

    // const foundUser = await db.User.findOne({
    //   name: 'oliver cromwell'
    // })
    // console.log('found user: ', foundUser)

  } catch (err) {
    console.log(err)
  }
}

dbConnection()