const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const routes = require('./routes/api')

const port = process.env.PORT || 4500

import seedData from './seedData'

const app = express()

mongoose
    .connect('mongodb://localhost/tutors_db', {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) throw err
        console.log("We are connected!")

        db.collection('tutors').countDocuments((err, count) => {
            if (err) throw err
            if (count === 0) seedData()
        })
    })

mongoose.Promise = global.Promise

app.use(express.static('public'))

app.use(bodyParser.json())

app.use('/api', routes)

app.use((err, req, res, next) => {
    res.status(422).send({
        error: err.message
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})