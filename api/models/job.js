const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jobNo:{type:String, required: true},
    date: Date,
    //year: { type: Number },
    //month: { type: Number },
    machineId: { type: mongoose.Schema.Types.ObjectId, required: true},
    reason: { type: mongoose.Schema.Types.ObjectId, ref: 'Reason', required: true},
    fault: { type: mongoose.Schema.Types.ObjectId, ref: 'Fault', required: true},
    inventory:{type:String, required: true},
    description:{type:String, required: true}
   
});

module.exports = mongoose.model('Job', jobSchema);