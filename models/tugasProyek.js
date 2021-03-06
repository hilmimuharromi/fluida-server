const mongoose = require("mongoose") ;

const tugasProyekSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
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

const tugasProyek = mongoose.model("tugasProyek", tugasProyekSchema);
module.exports = tugasProyek;