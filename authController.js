const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");
const connection = require("./dbConfig");
const User = require("./models/User");

const generateAccessToken = (id, email) => {
  const payload = {
    id,
    email,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};
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
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
      const token = generateAccessToken(user.id, user.email);
      return res.json({ token });
    } catch (error) {}
  }
  async getUsers(req, res) {
    try {
    } catch (error) {}
  }
}

module.exports = new authController();
