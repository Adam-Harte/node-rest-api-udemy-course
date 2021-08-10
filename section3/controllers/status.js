const User = require('../models/user');

exports.getStatus = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error('Could not find user.');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: 'Status fetched.',
      status: user.status
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const userId = req.userId;
  const status = req.body.status;

  try {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error('Could not find user.');
      error.statusCode = 404;
      throw error;
    }

    user.status = status;

    const result = await user.save();

    res.status(200).json({
      message: 'Status updated.',
      status: result.status
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
