const router = require('express').Router();
const { login, getAdminByToken } = require('../../controllers/admin/authController');
const auth = require('../../middlewares/admin/authMiddleware');


router.post('/login', login);
router.get('/getAdminByToken', auth, getAdminByToken);


module.exports = router;  