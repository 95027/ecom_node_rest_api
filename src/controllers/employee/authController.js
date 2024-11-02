const asyncHandler = require("express-async-handler");
const { Employee } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findOne({ where: { email } });

  if (employee) {
    return res.status(400).json({ message: "employee already exists" });
  }

  await Employee.create(req.body);

  res.status(200).json({ message: "employee registered successfully" });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ where: { email } });

  if (!employee) {
    return res.status(404).json({ message: "employee not found" });
  }

  const isPass = await bcrypt.compare(password, employee.password);

  if (!isPass) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET, {
    expiresIn: "23h",
  });

  res.status(200).json({ message: "employee logged in successfully", token });
});

const getEmployeeByToken = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findByPk(req.employeeId);

  if (!employee) {
    return res.status(404).json({ message: "employee not found" });
  }

  res.status(200).json({ message: "employee fetched successfully", employee });
});

module.exports = {
  login,
  getEmployeeByToken,
  register,
};
