const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  console.log("token validator");
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("authHeader", authHeader);

  // if (authHeader && authHeader.startsWith("Bearer")) {
  console.log("authHeader");
  token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401);
      throw { message: "Not authorized" };
    }
    req.decoded_user = decoded.data;

    console.log("decode", decoded);
    next();
    if (!token) {
      res.status(401);
      throw { message: "token not valid" };
    }
  });
  // }
});

module.exports = validateToken;
