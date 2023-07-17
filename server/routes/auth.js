const router = require('express').Router();
const registerValidation = require('../validation').registerValidation;
const loginValidation = require('../validation').loginValidation;
const User = require('../models').userModel; // create a model for Users
const jwt = require('jsonwebtoken');
/* middleware */
router.use((req, res, next) => {
  console.log('A request is coming in to auth.js');
  next();
});

router.get('/testAPI', (req, res) => {
  const msgObj = {
    message: 'Test API is working',
  };
  return res.json(msgObj);
});
/* 註冊 */
router.post('/register', async (req, res) => {
  // check the validation of data 檢查輸入的數據是否通過驗證器
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user exists 檢查使用者信箱是否已被註冊
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send('Email has already been registered.');

  // register the user 通過以上的檢查都OK後就幫使用者註冊
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({
      msg: 'success',
      saveObject: savedUser,
    });
  } catch (err) {
    res.status(400).send('User not saved.');
  }
});
/* 登入 */
router.post('/login', (req, res) => {
  // check the validation of data 檢查輸入的數據是否通過驗證器
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).send('User not found.'); // user不存在
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) return res.status(400).send(err);
          if (isMatch) {
            // 製作JWT
            const tokenObject = { _id: user._id, email: user.email };
            const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
            res.send({ success: true, token: 'JWT ' + token, user }); // token回傳給user
          } else {
            res.status(401).send('Wrong password');
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
module.exports = router;
