// contactController.js
// Import contact model
Contact = require("../model/employeeModel");
// Handle index actions
exports.index = function(req, res) {
  Contact.get(function(err, contacts) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Employees retrieved successfully",
      data: contacts
    });
  });
};
// Handle create contact actions
exports.new = function(req, res) {
  var contact = new Contact();
  contact.name = req.body.name ? req.body.name : contact.name;
  contact.gender = req.body.gender;
  contact.email = req.body.email;
  contact.phone = req.body.phone;
  contact.jobTitle = req.body.jobTitle;
  contact.jobType = req.body.jobType;
  contact.salaryRate = req.body.salaryRate;
  contact.deductRate = req.body.deductRate;
  // save the contact and check for errors
  contact.save(function(err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: "New employee created!",
      data: contact
    });
  });
};
// Handle view contact info
exports.view = function(req, res) {
  Contact.findById(req.params.id, function(err, contact) {
    if (err) res.send(err);
    res.json({
      message: "Employee details loading..",
      data: contact
    });
  });
};
// Handle update contact info
exports.update = function(req, res) {
  Contact.findById(req.params.id, function(err, contact) {
    if (err) res.send(err);
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    // save the contact and check for errors
    contact.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Employee Info updated",
        data: contact
      });
    });
  });
};
// Handle delete contact
exports.delete = function(req, res) {
  Contact.remove(
    {
      _id: req.params.id
    },
    function(err, contact) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Employee deleted"
      });
    }
  );
};
