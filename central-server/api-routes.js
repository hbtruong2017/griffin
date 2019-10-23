// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// Import employee controller
var employeeController = require('./controller/employeeController');
// Contact routes
router.route('/employees')
    .get(employeeController.index)
    .post(employeeController.new);
router.route('/employees/:id')
    .get(employeeController.view)
    .patch(employeeController.update)
    .put(employeeController.update)
    .delete(employeeController.delete);

var timesheetController = require('./controller/timesheetController')
router.route('/timesheet')
    .post(timesheetController.clockIn);
router.route('/timesheet/:id')
    .put(timesheetController.clockOut);
// Export API routes
module.exports = router;