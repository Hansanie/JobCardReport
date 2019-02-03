const mongoose = require('mongoose');

const machineSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serialNo:{type:String, required: true},
    problemId:{type:Number, autoIncrement:true[0]},
    department:{type:String, required: true},
    location:{type:String, required: true},
    //job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true},
   
   
});

module.exports = mongoose.model('Machine', machineSchema);