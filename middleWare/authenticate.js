const { Error } = require("../middleWare/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../service/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(Error(401, "Email in use"));
  }

  try {
    console.log(SECRET_KEY);
    const payload = jwt.verify(token, SECRET_KEY);
    console.log(payload);
    const user = await User.findById(payload.id);
    console.log(user);
    if (!user || !user.token || token !== String(user.token)) {
      next(Error(401, "Email in use"));
    }

    req.user = user;
    next();
  } catch (e) {
    next(Error(401, "Email in use"));
  }
};

module.exports = { authenticate };
