const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { secret } = require("../config");
const UserService = require("../service/user-service");
const connection = require("../dbconnect/dbconnect");
const User = require("../models/User");
const userService = require("../service/user-service");

// const generateAccessToken = (id, email) => {
//   const payload = {
//     id,
//     email,
//   };
//   return jwt.sign(payload, secret, { expiresIn: "24h" });
// };
class UserController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const userData = await userService.registration(name, email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 20 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({ userData });
      // res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 20 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({ userData });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 20 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({ userData });
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res) {
    const users = await userService.getAllUsers();
    res.json(users);
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
