const router = require('express').Router();
const login = require('../../controllers/admin/authController');


router.post('/login', login);


module.exports = router;  