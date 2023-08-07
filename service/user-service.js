const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenService = require("./token-service");
const apiError = require("../exceptions/api-error");

class UserService {
  async registration(name, email, password) {
    const candidate = await userModel.findOne({ where: { email: email } });
    if (candidate) {
      throw apiError.BadRequest("A user with the same email already exists");
    }
    const saltRounds = 8;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const tokens = tokenService.generateTokens({
      user: newUser.id,
      email: newUser.email,
    });
    await tokenService.saveToken(newUser.id, tokens.refreshToken);
    return {
      ...tokens,
      user: newUser.id,
      email: newUser.email,
    };
  }

  async login(email, password) {
    const user = await userModel.findOne({ where: { email: email } });
    if (!user) {
      throw apiError.BadRequest("User not found");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw apiError.BadRequest("Incorrect Password");
    }
    const tokens = tokenService.generateTokens({
      user: user.id,
      email: user.email,
    });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: user.id,
      email: user.email,
    };
  }
}

module.exports = new UserService();
