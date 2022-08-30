require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserService = require('../Services/user-service');

const verifyToken = async (req, res, next) => {
  // next();
  const token = req.header('x-access-token') || req.signedCookies['x-access-token'];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified?.user?.id;
    console.log(verified?.user?.id)
    // verify user still exists in db
    const u = await UserService.getById(req.userId);
    if (!u) {
      res.status(401).json({ error: "User does not exist" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Token is not valid" });
  }
};

module.exports = {
  verifyToken
};
