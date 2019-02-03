const mongoose = require('mongoose')

const technicianSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    regNo:{type:String, required: true},
    name:{type:String, required: true},
    empType:{type:String, required: true},
    department:{type:String, required: true},
    telNo:{type:String, required: true},

})

module.exports = mongoose.model('Technician', technicianSchema)
