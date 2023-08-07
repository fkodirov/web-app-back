require("dotenv").config();
const tokenModel = require("../models/Token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "20m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "15d",
    });
    return { accessToken, refreshToken };
  }
  async saveToken(userId, refreshToken) {
    let tokenData = await tokenModel.findOne({ userId: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
    } else {
      tokenData = await tokenModel.create({ userId: userId, refreshToken });
    }

    return tokenData;
  }
}

module.exports = new TokenService();
