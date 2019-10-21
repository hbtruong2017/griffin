// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var emplyeeSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salaryRate: {
        type: Number,
        required: true
    },
    deductRate: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model
var Contact = module.exports = mongoose.model('employee', emplyeeSchema);
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}