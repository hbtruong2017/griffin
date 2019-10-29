Timesheet = require("../model/timesheetModel");
moment = require("moment");

exports.getTimesheet = function(req, res) {
  Timesheet.findById(req.params.id, function(err, timesheet) {
    if (err) res.send(err);
    res.json({
      message: "Timesheet details loading..",
      data: timesheet
    });
  });
};

exports.clockIn = function(req, res) {
  var timesheet = new Timesheet();
  timesheet.employeeId = req.body.employeeId;
  timesheet.employeeName = req.body.employeeName;
  timesheet.timeIn = Date.now();
  timesheet.save(function(err) {
    res.json({
      message: "Employee logged in",
      data: timesheet,
      id: timesheet._id
    })
  });
}

exports.clockOut = function(req,res) {
  Timesheet.findById(req.params.id, function(err, timesheet) {
    if (err) res.send(err);
    timesheet.description = req.body.description;
    timesheet.timeOut = Date.now();
    timesheet.save(function(err) {
      if (err) res.json(err);
      let workHours = (timesheet.timeOut.getTime() - timesheet.timeIn.getTime()) / (60*1000);
      res.json({
        message: "Clockout successfully",
        data: timesheet,
        duration: workHours
      })
    })
  })
}