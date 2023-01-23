const { Error } = require("../middleWare/index");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../service/user");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(Error(401, "Email in use"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
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