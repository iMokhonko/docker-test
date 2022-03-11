const User = require('../models/authModel');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {

  const { username, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      username,
      password: hashedPassword
    });

    res.json({
      status: 'success',
      user
    });
  } catch(e) {
    res.status(400).json({ status: 'fail', error: e});
  }
};

exports.signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if(!user) {
      res.json({
        status: 'failed'
      })
    } else {
      const isCorrect = await bcrypt.compare(password, user.password);

      if(isCorrect) {
        res.send({
          status: 'signed up'
        })
      } else {
        res.send({
          status: 'invalid password'
        })
      }
    }
  } catch(e) {
    res.status(400).json({ status: 'fail', error: e });
  }
};