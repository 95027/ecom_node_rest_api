const router = require("express").Router();

const webRoutes = require("./web");
const adminRoutes = require("./admin");

router.use("/web", webRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
