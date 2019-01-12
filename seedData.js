import Tutor from './models/tutor'
import mongoose from 'mongoose'
import {
    data
} from './tutors'

export default async () => {
    Tutor.collection.insertMany(data, function (error, docs) {
        if (error) throw error
        console.log("Database seeded")
    })
}