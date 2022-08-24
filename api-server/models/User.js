const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const userSchema = new schema({
    firstName: String,
    lastName: String,
    businessEmail: String,
    phoneNumber: String,
    role: String,
    organization: { type: ObjectId, ref: 'Organization' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);