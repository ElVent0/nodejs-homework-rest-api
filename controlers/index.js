const { Contact } = require("../service/index");
const { Error } = require("../middleWare/index");

const getAll = async (req, res) => {
  const result = await Contact.find({});

  res.json({
    status: "done",
    code: 200,
    data: { result },
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw new Error(404, "Not found");
  }

  res.json({
    status: "done",
    code: 200,
    data: { result },
  });
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json({ status: "done", code: 201, data: { result } });
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw new Error(404, "Not found");
  }

  res.json({
    status: "done",
    code: 200,
    data: { result },
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw new Error(404, "Not found");
  }

  res.json({
    status: "done",
    code: 200,
    data: { result },
  });
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    throw new Error(400, `Missing field favorite`);
  }

  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw new Error(404, "Not found");
  }

  res.json({
    status: "done",
    code: 200,
    data: { result },
  });
};

module.exports = {
  getAll,
  add,
  getById,
  removeById,
  updateById,
  updateFavorite,
};
