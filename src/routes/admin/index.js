const router = require('express').Router();

const authRoutes = require('./authRoutes');
const roleRoutes = require('./roleRoutes');
const employeeRoutes = require('./employeeRoutes');

router.use('/auth', authRoutes);
router.use('/role', roleRoutes);
router.use('/employee', employeeRoutes);


module.exports = router;