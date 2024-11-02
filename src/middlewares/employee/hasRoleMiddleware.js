const asyncHandler = require("express-async-handler");
const { Employee, Role } = require("../../models");

const hasRole = (role) => {
  return async (req, res, next) => {
    const employee = await Employee.findByPk(req.employeeId, {
      include: [{ model: Role, where: { name: role }, required: true }],
    });

    if (!employee) {
        return res.status(403).json({ message: "employee not found" });
    }

    next();
  };
};

module.exports = hasRole;
