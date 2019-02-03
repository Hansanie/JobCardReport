const mongoose = require('mongoose');

const faultSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    faultName:{type: String, required: true}
});

module.exports = mongoose.model('Fault', faultSchema);