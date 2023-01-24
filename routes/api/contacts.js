const express = require("express");
const router = express.Router();
const { wrapper, validator } = require("../../middleWare/index");
const { authenticate } = require("../../middleWare/authenticate");
const {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateFavorite,
} = require("../../controlers/index");
const { joi, favoriteJoi } = require("../../service/index");

router.get("/", authenticate, wrapper(getAll));
router.get("/:contactId", authenticate, wrapper(getById));
router.post("/", validator(joi), authenticate, wrapper(add));
router.delete("/:contactId", authenticate, wrapper(removeById));
router.put("/:contactId", authenticate, validator(joi), wrapper(updateById));
router.patch(
  "/:contactId/favorite",
  validator(favoriteJoi),
  wrapper(updateFavorite)
);

module.exports = router;
