const Post = require('../models/postModel');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.json({
      status: 'success',
      results: posts.length,
      posts
    });
  } catch(e) {
    res.status(400).json({ status: 'fail', error: e });
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    res.json({
      status: 'success',
      post
    });
  } catch(e) {
    res.status(400).json({ status: 'fail', error: e });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    res.json({
      status: 'success',
      post
    });
  } catch(e) {
    res.status(400).json({ status: 'fail', error: e});
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.json({
      status: 'success',
      post
    });
  } catch(e) {
    res.status(400).json({ status: 'fail', error: e });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    res.json({ status: 'success' });
  } catch(e) {
    res.status(400).json({ status: 'fail', error: e });
  }
};