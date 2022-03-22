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
    salary:[{
            currencyId: {
                type: mongoose.Schema.Type.ObjectId,
                ref: "Currency",
                require: true
            },
            month:{
                type:Number,
                required: true
            },
            year:{
                type: Number,
                required: true,
            },
            ammount: {
                type: Number,
                require: true
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