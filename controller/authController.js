const User = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const AuthMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  // console.log(token);
  if (!token) {
    res.status(401).send({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.ACCESS_KEY, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const u = await User.findOne({
      userId: user.userId,
    });
    req.role = u.role;
    next();
  });
};

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bycrypt.genSalt();
    const passwordHash = await bycrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      role: "user",
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_KEY);

    res.send({ token }).status(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const ClerkSignUp = async (req, res) => {
  try {
    const { userId } = req.body;

    const token = jwt.sign({ userId: userId }, process.env.ACCESS_KEY);

    const oldUser = await User.findOne({ userId: userId });

    if (oldUser) {
      return res.status(200).json(token);
    }

    const newUser = new User({
      userId: userId,
      role: "user",
    });

    const user = await newUser.save();
    console.log(token);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  SignUp,
  Login,
  AuthMiddleware,
  ClerkSignUp,
};
