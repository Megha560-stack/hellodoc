const mongoose = require('mongoose')

const schema = mongoose.Schema({

    Name: String,
    Specialization: String,


})
const
    DoctorModel = mongoose.model('doctor', schema)
module.exports = DoctorModel