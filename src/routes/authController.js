import bcrypt from "bcryptjs";
import validator from "validator";
import { generateToken } from "../model/user.js";
import { Router } from "express";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const { userDataSource } = req.dataSources;
  const isEmail = validator.isEmail(email);
  if (!isEmail) {
    return res.status(400).json({ error: "Please enter a valid email" });
  }
  const existingUser = await userDataSource.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const userId = await userDataSource.createUser({
    username,
    email,
    password,
    role,
  });
  return res.json({ message: "User registered successfully", userId });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { userDataSource } = req.dataSources;

  const user = await userDataSource.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ error: "Invalid email or password" });
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({ error: "Invalid email or password" });
  }
  const token = await generateToken(user);
  res.json({
    message: "Login Successful",
    token,
    email,
    username: user.username,
    role: user.role,
  });
});

export default router;
