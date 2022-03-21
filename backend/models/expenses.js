const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "User",
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "Category",
        require: true
    },
    description: {
        type: string,
        require: true
    },
    currency: [
        {
            currencyId: {
                type: mongoose.Schema.Type.ObjectId,
                ref: "Currency",
                require: true
            },
            ammount: {
                type: Number,
                require: true
            }
        }
    ],
    date: {
        type: Date,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Expensess', expensesSchema);