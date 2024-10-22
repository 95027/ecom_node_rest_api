const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { Admin } = require("../../models");

const auth = asyncHandler(async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "token is required" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const admin = await Admin.findByPk(decoded.id);

  if (!admin) {
    return res.status(401).json({ message: "un authorized" });
  }

  req.adminId = admin.id;
  next();
});

module.exports = auth;
