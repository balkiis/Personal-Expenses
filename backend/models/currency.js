const mongoose = require('mongoose');
const currencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    convert: [{
        currencyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Currency",
            require: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
}, { timestamps: true })
module.exports = mongoose.model('Currency', currencySchema)

