const mongoose = require("mongoose") ;

const penilaianPraktikumSchema = new mongoose.Schema({
    answer: {
        type: String,
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
}, {timestamps: true})

const penilaianPraktikum = mongoose.model("penilaianPraktikum", penilaianPraktikumSchema);
module.exports = penilaianPraktikum;