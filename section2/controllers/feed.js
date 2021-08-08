const { validationResult } = require('express-validator/check')

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: 1,
        title: 'First post',
        content: 'This is the first post!',
        imageUrl: '',
        creator: {
          name: 'Adam',
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.postPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: 'Post created successfully!',
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: 'Adam'
      },
      createdAt: new Date()
    }
  });
};
