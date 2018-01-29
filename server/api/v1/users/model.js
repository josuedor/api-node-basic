const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    firstname: {
        type: String,
        max: 32,
        required: true
    },
    lastname: {
        type: String,
        max: 32,
        required: true
    },
    email: {
        type: String,
        max: 64,
        required: true
    },
    enable: {
        type: Boolean,
        default: true
    }
    
},{
    timestamps: true
});

module.exports = mongoose.model('user', schema);