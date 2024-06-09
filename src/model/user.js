import jwt from "jsonwebtoken";

import { config } from "../config.js";

const JWT_SECRET = config.jwtSecret;

export async function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username,  email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
}

export async function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
