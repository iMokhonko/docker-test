const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route("/signUp")
  .post(authController.signUp);

router.route("/signIn")
  .post(authController.signIn);

module.exports = router;