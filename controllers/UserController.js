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
      // const user = await User.findOne({ email });
      // if (!user) {
      //   return res.status(400).json({ message: "User not found" });
      // }
      // const validPassword = bcrypt.compareSync(password, user.password);
      // if (!validPassword) {
      //   return res.status(400).json({ message: "Incorrect Password" });
      // }
      // // const token = generateAccessToken(user.id, user.email);
      // return res.json({ token });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res) {
    const users = await User.findAll();
    res.json(users);
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
