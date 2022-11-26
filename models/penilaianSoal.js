const mongoose = require("mongoose") ;

const penilaianSoalSchema = new mongoose.Schema({
    answer: {
        type: Array,
        required: true,
    },
    soal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "soalLatihan",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    score: {
        type: Number
    }
}, {timestamps: true})

const penilaianSoal = mongoose.model("penilaianSoal", penilaianSoalSchema);
module.exports = penilaianSoal;