const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    disable: {
        type: Boolean,
        default: false
    }
    
},{
    timestamps: true
})

module.exports = mongoose.model('author', schema)