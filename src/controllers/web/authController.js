const asyncHandler = require("express-async-handler");
const { User, RefreshToken } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const refreshTokenGenerate = require("../../utils/refreshToken");
const sendEmail = require("../../utils/mail");
const { forgotPasswordtemp } = require("../../utils/mailTemplate");

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

  refreshTokenGenerate(user.id, res);

  res.status(200).json({ message: "user logged in successfully", token });
});

const getUserByToken = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.userId);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json({ message: "user fetched successfully", user });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  await sendEmail(
    email,
    "Forgot password from",
    forgotPasswordtemp(token, email)     
  );

  res.status(200).json({ message: "mail sent successfully" });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { token, password } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findByPk(decoded.id);

  if (!user) {
    return res.status(401).json({ message: "invalid or expired token" });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  user.update({
    password: hashedPass,
  });

  res.status(200).json({ message: "password reset successfully" });
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ message: "refresh token not found" });
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

  const user = await User.findByPk(decoded.id);

  if (!user) {
    return res.status(401).json({ message: "invalid or expired token" });
  }

  const isRefresh = await RefreshToken.findOne({ where: { userId: user.id } });

  if (!isRefresh) {
    return res
      .status(404)
      .json({ message: "user blocked or restricted to access" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  refreshTokenGenerate(user.id, res);

  res.status(200).json({ message: "token generated successfully", token });
});

module.exports = {
  register,
  login,
  getUserByToken,
  refreshToken,
  forgotPassword,
  resetPassword,
};
