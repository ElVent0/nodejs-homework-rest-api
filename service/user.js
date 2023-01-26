const { model, Schema } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
});

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
  //   email: Joi.string().pattern(регулярний вираз з шаблоном).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  //   email: Joi.string().pattern(регулярний вираз з шаблоном).required(),
});

const verifySchema = Joi.object({
  email: Joi.string(),
});

const User = model("user", userSchema);

module.exports = { User, registerSchema, loginSchema, verifySchema };
