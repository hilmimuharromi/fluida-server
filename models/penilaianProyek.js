const mongoose = require("mongoose") ;

const penilaianProyekSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: true,
    },
    proyek: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tugasProyek",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    score: {
        type: Number
    }
}, {timestamps: true})

const penilaianProyek = mongoose.model("penilaianProyek", penilaianProyekSchema);
module.exports = penilaianProyek;