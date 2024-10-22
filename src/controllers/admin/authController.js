const asyncHandler = require("express-async-handler");
const { Admin } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ where: { email } });

  if (!admin) {
    return res.status(404).json({ message: "admin not found" });
  }

  const isPass = await bcrypt.compare(password, admin.password);

  if (!isPass) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
    expiresIn: "23h",
  });

  res.status(200).json({ message: "admin logged in successfully", token });
});

const getAdminByToken = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findByPk(req.adminId);

  if (!admin) {
    return res.status(404).json({ message: "admin not found" });
  }

  res.status(200).json({ message: "admin fetched successfully", admin });
});

module.exports = {
  login,
  getAdminByToken,
};
