const {
  getAllEmployees,
  assignEmployeeRoles,
} = require("../../controllers/admin/employeeController");
const auth = require("../../middlewares/employee/authMiddleware");
const hasRole = require("../../middlewares/employee/hasRoleMiddleware");

const router = require("express").Router();

router.get("/", auth, hasRole("admin"), getAllEmployees);
router.post("/", assignEmployeeRoles);

module.exports = router;
