const asyncHandler = require("express-async-handler");
const { Role, RoleHasPermission } = require("../../models");

const createRole = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const role = await Role.findOne({ where: { name } });

  if (role) {
    return res.status(400).json({ message: "role already exists" });
  }

  await Role.create(req.body);

  res.status(200).json({ message: "role created successfully" });
});

const getAllRoles = asyncHandler(async (req, res, next) => {});

const updateRole = asyncHandler(async (req, res, next) => {});

const destroyRole = asyncHandler(async (req, res, next) => {});

const assignRolePermissions = asyncHandler(async (req, res, next) => {
  const { roleId, permissionIds } = req.body;

  const permissions = permissionIds.map((per) => {
    return {
      roleId,
      permissionId: per,
    };
  });

  await RoleHasPermission.bulkCreate(permissions);

  res.status(200).json({ message: "permissions assigned successfully" });
});

module.exports = {
  createRole,
  getAllRoles,
  updateRole,
  destroyRole,
  assignRolePermissions,
};
