const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log("authHeader", authHeader);
    if (!authHeader) {
      throw { status: 400, message: "auth header not found" };
    }

    if (!authHeader.startsWith("Bearer")) {
      throw { status: 400, message: "add Bearer in auth header" };
    }

    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw { status: 401, message: "Not authorized" };
      }
      req.decoded_user = decoded.data;

      // console.log("decode", decoded);
      next();
    });
  } catch (err) {
    console.log("token-validation", err);
    next(err);
  }
};

module.exports = validateToken;
