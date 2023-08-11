const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  newPost,
  deletePost,
  login,
} = require('../../controllers/user-controller');