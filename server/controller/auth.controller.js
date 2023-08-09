import jwt from 'jsonwebtoken';
import { loginValidation, registerValidation } from '../validation.js';
import { UserModel } from '../models/index.js';

class AuthController {
  /*-------註冊-------*/
  static register = async (req, res) => {
    // check the validation of data 檢查輸入的數據是否通過驗證器
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the user exists 檢查使用者信箱是否已被註冊
    const emailExist = await UserModel.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email has already been registered.');

    // register the user 通過以上的檢查都OK後就幫使用者註冊
    const newUser = new UserModel({
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
  };

  /*-------登入-------*/
  static login = async (req, res) => {
    // check the validation of data 檢查輸入的數據是否通過驗證器
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) return res.status(401).send('User not found.'); // user不存在

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          // 製作JWT
          const tokenObject = { _id: user._id, email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          res.send({ success: true, token: 'JWT ' + token, user });
          // 伺服器回傳物件包含屬性success & token & 物件user
        } else {
          res.status(401).send('Wrong password');
        }
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };
}

export default AuthController;
