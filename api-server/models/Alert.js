const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const alertSchema = new schema({
    dprNo: String,
    problem: String,
    orgId: String,    
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);