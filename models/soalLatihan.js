const mongoose = require("mongoose") ;

const soalLatihanSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
}, {timestamps: true})

const soalLatihan = mongoose.model("soalLatihan", soalLatihanSchema);
module.exports = soalLatihan;