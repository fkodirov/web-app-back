const bcrypt = require("bcryptjs");
const connection = require("./dbConfig");
const User = require("./models/User");
class authController {
  async registration(req, res) {
    const { name, password, email } = req.body;
    try {
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "A user with the same email already exists" });
      }
      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(400).json({ error: "Registeration error" });
    }
  }
  async login(req, res) {
    try {
    } catch (error) {}
  }
  async getUsers(req, res) {
    try {
    } catch (error) {}
  }
}

module.exports = new authController();
