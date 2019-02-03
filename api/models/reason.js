const mongoose = require('mongoose');

const reasonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reasonDescription:{type:String, required: true}
});

module.exports = mongoose.model('Reason', reasonSchema);