const mongoose = require("mongoose") ;
const { hashPassword } = require("../helper/hash") 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
}, {timestamps: true})

userSchema.pre("save", function () {
    const hashedPassword = hashPassword(this.password);
    this.password = hashedPassword;
});

const user = mongoose.model("user", userSchema);
module.exports = user;