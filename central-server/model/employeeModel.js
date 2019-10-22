// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    salaryRate: {
        type: Number,
        required: true
    },
    deductRate: {
        type: Number,
        default: 0
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model
var Employee = module.exports = mongoose.model('Employee', employeeSchema);
module.exports.get = function (callback, limit) {
    Employee.find(callback).limit(limit);
}