require('dotenv').config()
const db = require('./models')
db.connect()

const testEvent = async () => {
    try {
        const newEvent = new db.Event({
            eventName: 'Code: Chella',
            location: 'The Cloud',
            friend: 'test3'
        })
        await newEvent.save()
        console.log('new event: ', newEvent)
        
        const foundEvent = await db.Event.findOne({
            eventName: 'Code: Chella'
        })
        console.log('found event: ', foundEvent)
    } catch (err) {
        console.log(err)
    }
}

testEvent()