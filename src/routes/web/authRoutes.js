const { register, login, getUserByToken } = require('../../controllers/web/authController');
const auth = require('../../middlewares/web/authMiddleware');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/getUserByToken', auth, getUserByToken);


module.exports = router;