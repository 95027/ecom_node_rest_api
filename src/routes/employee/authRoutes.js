const {
  register,
  login,
  getEmployeeByToken,
} = require("../../controllers/employee/authController");
const auth = require("../../middlewares/employee/authMiddleware");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getEmployeeByToken", auth, getEmployeeByToken);

module.exports = router;
