const mongoose = require('mongoose');
const schema = mongoose.Schema;
const blog=require("./blog")

const user = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog"
    }]
})

module.exports = mongoose.model('User', user)