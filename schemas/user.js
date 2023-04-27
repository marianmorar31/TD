const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    gender: String,
    address: String,
    phone_number: String,
    user_type: Number,
    age: Number
})

module.exports = mongoose.model('user', userSchema)