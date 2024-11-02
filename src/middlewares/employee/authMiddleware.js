const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { Employee } = require("../../models");

const auth = asyncHandler(async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "token is required" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const employee = await Employee.findByPk(decoded.id);

  if (!employee) {
    return res.status(401).json({ message: "un authorized" });
  }

  req.employeeId = employee.id;
  next();
});

module.exports = auth;
