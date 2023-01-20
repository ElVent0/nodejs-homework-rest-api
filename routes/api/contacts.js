const express = require("express");
const router = express.Router();
const Joi = require("joi");
const contactsHandler = require("../../models/contacts");
const { NotFound, BadRequest, InternalServerError } = require("http-errors");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsHandler.listContacts();
    res.json({ status: "Done", code: 200, data: { result } });
  } catch (e) {
    throw new InternalServerError(`Error`);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsHandler.getContactById(contactId);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json({ status: "Done", code: 200, data: { result } });
  } catch (e) {
    throw new InternalServerError(`Error`);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (schema.validate(req.body)) {
      throw new BadRequest("Missing required name field");
    }

    const result = await contactsHandler.addContact(req.body);
    res.status(201).json({ status: "Done", code: 201, data: { result } });
  } catch (e) {
    throw new InternalServerError(`Error`);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsHandler.removeContact(contactId);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.status(200).json({
      status: "Done",
      code: 200,
      data: { result },
      message: "Contact deleted",
    });
  } catch (e) {
    throw new InternalServerError(`Error`);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (schema.validate(req.body)) {
      throw new BadRequest("Missing fields");
    }

    const { contactId } = req.params;
    const result = await contactsHandler.updateContact(contactId, req.body);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.status(200).json({ status: "Done", code: 200, data: { result } });
  } catch (e) {
    throw new InternalServerError(`Error`);
  }
});

module.exports = router;
