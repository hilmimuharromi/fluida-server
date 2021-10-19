const mongoose = require("mongoose") ;

const materiSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
}, {timestamps: true})

const materi = mongoose.model("materi", materiSchema);
module.exports = materi;