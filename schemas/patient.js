const mongoose = require("mongoose")

const pacientSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('pacient', pacientSchema)