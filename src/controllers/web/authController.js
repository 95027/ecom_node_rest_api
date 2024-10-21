const asyncHandler = require("express-async-handler");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const isEmail = await User.findOne({ where: { email } });

  if (isEmail) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await User.create({
    ...req.body,
    password: hashedPass,
  });

  res.status(200).json({ message: "user registration successful", user });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  isPass = await bcrypt.compare(password, user.password);

  if (!isPass) {
    return res.status(400).json({ message: "invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  const refreshToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "30d"});

  res.status(200).json({ message: "user logged in successfully", token, refreshToken });
});

const getUserByToken = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.userId);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json({ message: "user fetched successfully", user });
});

module.exports = {
  register,
  login,
  getUserByToken,
};
