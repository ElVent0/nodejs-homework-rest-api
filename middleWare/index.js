// const multer = require("multer");
// const path = require("path");

const wrapper = (action) => {
  return async (req, res, next) => {
    try {
      await action(req, res, next);
    } catch (e) {
      next(e);
    }
  };
};

const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      next(error);
    } else {
      next();
    }
  };
};

const Error = (status, message) => {
  // const error = new Error(message);
  // error.status = status;
  // return error;
  console.log("Error");
};

// const multerConfig = multer.diskStorage({
//   destination: path.join(__dirname, "../", "temp"),
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

module.exports = {
  wrapper,
  validator,
  Error,
  // upload,
};
