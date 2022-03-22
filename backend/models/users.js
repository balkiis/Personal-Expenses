const { number } = require('@hapi/joi')
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        required: true
    },
    salary: [{
        amount: [{
            currencyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Currency"
            },
            amount: {
                type: Number
            }
        }],
        month: {
            type: Number
        },
        year: {
            type: Number
        }
    }]
})
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})
module.exports = mongoose.model('User', userSchema)