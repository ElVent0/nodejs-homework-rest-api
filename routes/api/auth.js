const express = require("express");
const router = express.Router();
const { wrapper, validator } = require("../../middleWare/index");
const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controlers/auth");
const { registerSchema, loginSchema } = require("../../service/user");
const { authenticate } = require("../../middleWare/authenticate");

router.post("/users/register", validator(registerSchema), wrapper(register));
router.post("/users/login", validator(loginSchema), wrapper(login));
router.get("/current", authenticate, wrapper(getCurrent));
router.post("/logout", authenticate, wrapper(logout));
module.exports = router;
