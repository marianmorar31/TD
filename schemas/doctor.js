const mongoose = require("mongoose")

const doctorSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    spec_id: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('doctor', doctorSchema)