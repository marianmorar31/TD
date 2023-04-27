const mongo = require('./mongo')
const specializationSchema = require('./schemas/specialization')
const doctorSchema = require('./schemas/doctor')
const patientSchema = require('./schemas/patient')
const userSchema = require('./schemas/user')

const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try {
            console.log('connected to mongodb');

            const doctor = {
                username: "heidrich",
                password: 1234,
                first_name: "Heidrich",
                last_name: "Vidas",
                gender: "male",
                address: "Cluj-Napoca",
                phone_number: 123456,
                user_type: 2
            }

            const doctor1 = {
                username: "tadg",
                password: 1234,
                first_name: "Tadg",
                last_name: "Swapna",
                gender: "male",
                address: "Cluj-Napoca",
                phone_number: 123456,
                user_type: 2
            }

            const doctor2 = {
                username: "gaye",
                password: 1234,
                first_name: "Gaye",
                last_name: "Yoldirim",
                gender: "male",
                address: "Cluj-Napoca",
                phone_number: 123456,
                user_type: 2
            }

            const doctor3 = {
                username: "heidrich",
                password: 1234,
                first_name: "Heidrich",
                last_name: "Vidas",
                gender: "male",
                address: "Cluj-Napoca",
                phone_number: 123456,
                user_type: 2
            }

            const doctor4 = {
                username: "ulvi",
                password: 1234,
                first_name: "Ulvi",
                last_name: "Danutė",
                gender: "male",
                address: "Cluj-Napoca",
                phone_number: 123456,
                user_type: 2
            }
            
            await new userSchema(doctor).save();
            await new userSchema(doctor1).save();
            await new userSchema(doctor2).save();
            await new userSchema(doctor3).save();
            await new userSchema(doctor4).save();
        } finally {
            mongoose.connection.close()
        }
    })
}

connectToMongoDB()