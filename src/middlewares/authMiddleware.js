import { verifyToken } from "../model/user.js";

async function authenticate(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export default authenticate;
