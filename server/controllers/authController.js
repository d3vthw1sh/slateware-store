import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 🔐 Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ REGISTER: POST /api/auth/register
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user);

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token,
  });
};

// ✅ LOGIN: POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token,
  });
};

// 🧪 GOOGLE LOGIN: POST /api/auth/google
export const googleLogin = async (req, res) => {
  const { token } = req.body;
  // You’ll verify this token using `google-auth-library` in future steps
  return res.status(501).json({ message: "Google login not implemented yet." });
};
