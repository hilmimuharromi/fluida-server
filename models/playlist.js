const mongoose = require("mongoose") ;

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    },
    contents: [{
        key: Number,
        flag: String,
        materi: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "materi",
        },
        praktikum: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "praktikum",
        },
        soalLatihan: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "soalLatihan",
        },
        tugasProyek: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "tugasProyek",
        },
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
}, {timestamps: true})

const playlist = mongoose.model("playlist", playlistSchema);
module.exports = playlist;