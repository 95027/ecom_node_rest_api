const asyncHandler = require("express-async-handler");
const { Employee, ModelHasRole, Role } = require("../../models");

const getAllEmployees = asyncHandler(async (req, res, next) => {
  const employees = await Employee.findAll({
    include: [
      {
        model: Role,
      },
    ],
  });

  res.status(200).json({ message: "emplyees fetched successfully", employees });
});

const assignEmployeeRoles = asyncHandler(async (req, res, next) => {
  const { modelId, roleIds } = req.body;

  const roles = roleIds.map((role) => {
    return {
      modelId,
      modelType: "employee",
      roleId: role,
    };
  });

  await ModelHasRole.bulkCreate(roles);

  res.status(200).json({ message: "permissions assigned successfully" });
});

module.exports = {
  getAllEmployees,
  assignEmployeeRoles,
};
