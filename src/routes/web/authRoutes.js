const { register, login, getUserByToken, refreshToken, forgotPassword, resetPassword } = require('../../controllers/web/authController');
const auth = require('../../middlewares/web/authMiddleware');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getUserByToken', auth, getUserByToken);
router.get('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


module.exports = router;