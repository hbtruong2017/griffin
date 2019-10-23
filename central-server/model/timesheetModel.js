// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var timesheetSchema = mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    timeIn: {
        type: Date,
        default: Date.now
    },
    timeOut: {
        type: Date
    },
    description: {
        type: String
    }
});
// Export Contact model
var Timesheet = module.exports = mongoose.model('Timesheet', timesheetSchema);
module.exports.get = function (callback, limit) {
    Timesheet.find(callback).limit(limit);
}