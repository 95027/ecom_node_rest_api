const router = require("express").Router();

const webRoutes = require("./web");
const adminRoutes = require("./admin");
const employeeRoutes = require("./employee");

router.use("/web", webRoutes);
router.use("/admin", adminRoutes);
router.use("/employee", employeeRoutes);

module.exports = router;
