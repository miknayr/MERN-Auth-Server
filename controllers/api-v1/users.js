const router = require('express').Router()
const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute.js')

// GET /users -- test api endpoint
router.get('/', (req, res) => {
  res.json({msg: 'hi! the user endpoint is ok 👌'})
})

// GET /locations
router.get('/location/:id', (req, res) => {
  db.Location.findById(req.params.id).populate('friends').populate('location')
  .then(foundLocation => {
    res.send(foundLocation)
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/location', (req, res) => {
  db.Location.find().populate('friends')
  .then(foundLocations => {
    res.json(foundLocations)
  })
  .catch(err => {
    console.log(err)
  })
})

router.delete('/location/:id', (req, res) => {
  db.Location.findOneAndDelete({
    _id: req.params.id
  }, {useFindAndModify: false})
  .then(deletedLocation => {
    res.send(deletedLocation)
  })
  .catch(err => {
    console.log(err)
  })
})

// GET current user location
router.get('/profile/:id', async (req, res) => {
    try {
        const findUser = await db.User.findById(req.params.id).populate('location')
        res.json(findUser)
    } catch (err) {
        console.log(err)
    }
})

// PUT (update) current user location
router.put('/profile/:id', async (req, res) => {
    try {
        const currentUser = await db.User.findById(req.params.id)
        const findLocation = await db.Location.findOne({name: req.body.placeName})

        currentUser.location = await findLocation

        await currentUser.save()

        res.json({currentUser})

    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

// adding friend list route
router.get('/friends/:id', async (req,res) => {
    try{
        const findUser = await db.User.findById(req.params.id).populate('friends')
        console.log("find User:",findUser)
        res.json(findUser)
    } catch(err){
        console.log(err)
    }
})

// POST -- adding new friends
router.post('/friends/:id', async(req,res) => {

    try {  
        const currentUser = await db.User.findById(req.params.id)
        const findFriend = await db.User.findOne({ name: req.body.name })
    if (!findFriend) return res.status(400).json({msg: 'Your friend does not have this app' })
        currentUser.friends.push(findFriend._id)
        findFriend.friends.push(currentUser._id)
    
        await currentUser.save()
        await findFriend.save()
        res.json({currentUser})

    } catch (err) {
        console.log(err)
    }
})

router.delete('/friends/:id', async (req, res) => {
    try {
        const currentUser = await db.User.findById(req.params.id)
        const findFriend = await db.User.findOne({ name: req.body.name })

        currentUser.friends.pop(findFriend._id)
        findFriend.friends.pop(currentUser._id)
        
        await currentUser.save()
        await findFriend.save()
        res.json({currentUser})

    } catch (err) {
        console.log(err)
    }
})

// Event Creation Route

router.post('/events/:id', async (req, res) => {
  // create event with req.body
  // grab user from db
  // grab associated friend from db 

  // grab the currentuser from req.params.id, findOne myself, cross-push for db, then save
  // let find currentuser
  try {
    let { friend, ...eventInfo} = req.body
    let findSelf = await db.User.findById(req.params.id)
    let foundUser = await db.User.findOne({ name: friend})
    let createdEvent = await db.Event.create(eventInfo)
    findSelf.events.push(createdEvent._id)
    foundUser.events.push(createdEvent._id)
    createdEvent.users.push(foundUser._id)
    findSelf.save()
    foundUser.save()
    createdEvent.save()
    console.log(createdEvent)
  } catch(err) {
    console.log(`you have an ${err} in Event postroute`)
  }
})

// POST /users/register -- CREATE new user (aka register)
router.post('/register', async (req, res) => {
  try {
    // check if user exists alrdy
    const findUser = await db.User.findOne({
      email: req.body.emails
    })
    .populate('friends')
    .populate('location')
    // if the user found -- dont let them register
    if(findUser) return res.status(400).json({msg: 'user already exists in the db'})
    console.log(findUser)

    // hash password from req.body
    const password = req.body.password
    const salt = 12
    const hashedPassword = await bcrypt.hash(password, salt)

    // create our new user
    const newUser = db.User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }) 
    await newUser.save()

    // create the jwt payload
    const payload = {
      name: newUser.name,
      email: newUser.email,
      id: newUser.id,
     }
     // sign the jwt and send a response
     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d'})

     res.json({ token })

  } catch (err) {
    console.log(err)
    res.status(500).json({msg: 'internal server error'})
  }
})

// POST /user/login -- validate login credentials
router.post('/login', async (req, res) => {
    try {
        // try to find the user in the database
        const findUser = await db.User.findOne({
        email: req.body.email
        })
        .populate('friends')
        .populate('location')
        console.log(findUser)
        const validationFailedMessage = 'incorrect username or password 🤣'
        // if the user found -- return immediately 
        if (!findUser) return res.status(400).json({msg: validationFailedMessage })
        // check the user's password from the db against what is in the req.body
        const matchPassword = await bcrypt.compare(req.body.password, findUser.password)
        // if the password doesnt match -- return immediately
        if (!matchPassword) return res.status(400).json({msg: validationFailedMessage })
        // create the jwt payload
        const payload = {
        name: findUser.name,
        email: findUser.email,
        id: findUser.id
        }
        // sign the jwt and send it back
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h' })
        res.json({ token })
    
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: 'internal server error'})
    }
})

// GET /auth-locked -- will redirect if a bad jwt is found
  router.get('/auth-locked', authLockedRoute, (req, res) => {
    // do whatever we like with the user
    console.log(res.locals.user)
    // send private data back
    res.json({ msg: ' welcome to the auth locked route 🐶🐶🐶'})
  })


  // PUT /bounties/:id -- UPDATE one bounty and redirect to /bounties

router.put('/profile/edit', (req, res) => {
  db.User.findById(req.params.id)
  .then(user => {
    user.name = req.body.name

    user.save()
    .then(() => {
      res.redirect('/profile')
    })
    .catch ((err) => console.log(err))
  })
  .catch ((err) => console.log(err))
})

module.exports = router