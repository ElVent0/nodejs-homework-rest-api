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

module.exports = {
  wrapper,
  validator,
  Error,
};
