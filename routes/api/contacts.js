const express = require("express");
const { wrapper, validator } = require("../../middleWare/index");
const {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateFavorite,
} = require("../../controlers/index");
const { joi, favoriteJoi } = require("../../service/index");

const router = express.Router();

router.get("/", wrapper(getAll));
router.get("/:contactId", wrapper(getById));
router.post("/", validator(joi), wrapper(add));
router.delete("/:contactId", wrapper(removeById));
router.put("/:contactId", validator(joi), wrapper(updateById));
router.patch(
  "/:contactId/favorite",
  validator(favoriteJoi),
  wrapper(updateFavorite)
);

module.exports = router;
