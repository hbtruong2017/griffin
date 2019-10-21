const router = require("express").Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        students: {
            name: 'Zuolin',
            description: 'Runtime terror 1'
        } 
    })
})





module.exports = router;
