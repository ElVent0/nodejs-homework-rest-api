const { model, Schema } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const joi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.bool(),
});

const favoriteJoi = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", schema);

module.exports = { Contact, joi, favoriteJoi };
