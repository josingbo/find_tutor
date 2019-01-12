const express = require('express')
const router = express.Router()
const Tutor = require('../models/tutor')

router.get('/tutors', async (req, res, next) => {
    try {
        const tutors = await Tutor
            .aggregate()
            .near({
                near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
                distanceField: "dist.calculated",
                maxDistance: 100000,
                spherical: true
            })

        res.send(tutors).status(200)
    } catch (error) {
        next(error)
    }
})

router.post('/tutors', async (req, res, next) => {
    try {
        const tutor = await Tutor.create(req.body)
        res.send(tutor).status(200)
    } catch (error) {
        next(error)
    }
})

router.put('/tutors/:id', async (req, res, next) => {
    try {
        const tutor = await Tutor.findOneAndUpdate({
                _id: req.params.id
            },
            req.body, {
                new: true
            }
        )

        res.send(tutor).status(200)
    } catch (error) {
        next(error)
    }
})

router.delete('/tutors/:id', async (req, res, next) => {
    try {
        const tutor = await Tutor.findByIdAndRemove(req.params.id)
        res.status(200).send(tutor)
    } catch (error) {
        next(error)
    }
})

module.exports = router