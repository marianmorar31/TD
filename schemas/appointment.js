const mongoose = require("mongoose")

const appointmentSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    doct_id: mongoose.Schema.Types.ObjectId,
    date: String,
    remark: String,
    description: String,
    diagnostic: String,
    medication: String,
    observations: String,
    title: String
})

module.exports = mongoose.model('appointment', appointmentSchema)