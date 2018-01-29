const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    content: {
        type: String,
        max: 280,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    location: {
        type: String,
        max: 32,
    },
},{
    timestamps: true
});

module.exports = mongoose.model("tweet", schema);