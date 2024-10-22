const jwt = require("jsonwebtoken");
const { RefreshToken } = require("../models");

const refreshTokenGenerate = async (userId, res) => {
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  });

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toString();

  const isRefresh = await RefreshToken.findOne({ where: { userId } });

  if (isRefresh) {
    isRefresh.update({
      token: refreshToken,
      expiresAt,
    });
  } else {
    await RefreshToken.create({
      userId,
      token: refreshToken,
      expiresAt,
    });
  }
};

module.exports = refreshTokenGenerate;
