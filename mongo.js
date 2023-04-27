const mongoose = require('mongoose')
const mongoPath = 'mongodb+srv://admin:3cTKH2F1EmQBCmpT@dt-project.0swha.mongodb.net/hospital?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}