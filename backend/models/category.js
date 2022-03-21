const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        required: true
    },
    userId: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "User",
    }

})
module.exports = mongoose.model('Category', categorySchema)