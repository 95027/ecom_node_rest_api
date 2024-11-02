const {
  createRole,
  getAllRoles,
  updateRole,
  destroyRole,
  assignRolePermissions,
} = require("../../controllers/admin/roleController");

const router = require("express").Router();

router.get("/", getAllRoles);
router.post("/", createRole);
router.post("/permission", assignRolePermissions);
router.put("/:id", updateRole);
router.delete("/:id", destroyRole);

module.exports = router;
