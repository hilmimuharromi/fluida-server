const mongoose = require("mongoose") ;

const praktikumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    questions: {
        type: Array,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
}, {timestamps: true})

const praktikum = mongoose.model("praktikum", praktikumSchema);
module.exports = praktikum;