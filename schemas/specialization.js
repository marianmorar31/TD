const mongoose = require("mongoose")

const specializationSchema = mongoose.Schema({
    spec_name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('specializations', specializationSchema)