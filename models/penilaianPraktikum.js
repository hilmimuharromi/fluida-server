const mongoose = require("mongoose") ;

const penilaianPraktikumSchema = new mongoose.Schema({
    answer: {
        type: Array,
        required: true,
    },
    praktikum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "praktikum",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    score: {
        type: Number
    }
}, {timestamps: true})

const penilaianPraktikum = mongoose.model("penilaianPraktikum", penilaianPraktikumSchema);
module.exports = penilaianPraktikum;